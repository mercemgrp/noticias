import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { first, finalize, tap, takeUntil } from 'rxjs/operators';
import { ArticleUi } from 'src/app/models/articleUi';
import { Menu } from 'src/app/models/menu';
import { AnimationsService } from 'src/app/services/animations.service';
import { ConfigService } from 'src/app/services/config.service';
import { NewsService } from 'src/app/services/news.service';
import { StorageService } from 'src/app/services/storage.service ';

@Component({
  selector: 'app-categories-tab',
  templateUrl: 'categories-tab.page.html',
  styleUrls: ['categories-tab.page.scss']
})
export class CategoriesTabPage {
  articles: ArticleUi[] = [];
  error = false;
  categories: Menu[] = [{
    id: 'business',
    title: 'Negocios'
  }, {
    id: 'entertainment',
    title: 'Entretenimiento'
  }, {
    id: 'general',
    title: 'General'
  }, {
    id: 'health',
    title: 'Salud'
  }, {
    id: 'science',
    title: 'Ciencia'
  },{
    id: 'sports',
    title: 'Deportes'
  },{
    id: 'technology',
    title: 'Tecnología'
  }
  ];
  categorySelected: string;
  firstLoading: boolean;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private configService: ConfigService,
    private newsService: NewsService,
    private storageService: StorageService,
    private animationsService: AnimationsService) {
  }

  ngOnInit() {
    this.categorySelected = this.categories[0].id;
    this.configService.languageChanges$
      .pipe(
        tap(_ => this.getHeadlinesByCategory(this.categorySelected)),
        takeUntil(this.ngUnsubscribe)
      )  
      .subscribe();
    this.storageService.favoritesChanges$
      .pipe(tap(_ => this.updateFavorites()))  
      .subscribe();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onCategoryChanged(categoryId) {
    this.categorySelected = categoryId;
    this.getHeadlinesByCategory(this.categorySelected);
  }

  onToggleFavorite(article: ArticleUi) {
    this.storageService.toggleFavorite(article.article)
      .then(_ => {
        article.selected = !article.selected;
        this.animationsService.heartAnimation(article.id).play();
      })
      .catch(_ => console.log('Mostrar error'))
  }

  onLoadNextHeadlines(e) {
    this.getHeadlinesByCategory(this.categorySelected, e);
  }

  private getHeadlinesByCategory(categoryId, e?) {
    if (!e) {
      this.firstLoading = true;
      this.articles = [];
    }
    this.newsService.getHeadlinesByCategory(categoryId, !!!e)
      .pipe(
        first(),
        finalize(() => {
          this.firstLoading = false;
          if (e) {
            e.target.complete();
          }
        })
      ).subscribe(
        news => {
          this.articles.push( ...news.map((currentNew, i) => {
            return {
              id: 'categoryId_' + this.categorySelected +'_' + this.articles.length + i,
              selected: this.storageService.favoritesHeadlines.some(favNew => currentNew.title === favNew.title),
              article: currentNew
            }
          }));
          if (!news.length && e) {
            e.target.disabled = true;
          }
          
        },
        _ => this.error = true
      );
  }

  private updateFavorites() {
    this.articles.forEach(article => {
      article.selected = this.storageService.favoritesHeadlines.some(favNew => article.article.title === favNew.title)
    });
  }

}
