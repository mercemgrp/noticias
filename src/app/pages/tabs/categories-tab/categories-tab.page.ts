import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { first, finalize, tap, takeUntil } from 'rxjs/operators';
import { AnimationsService } from 'src/app/services/animations.service';
import { ConfigService } from 'src/app/services/config.service';
import { NewsService } from 'src/app/services/news.service';
import { StorageService } from 'src/app/services/storage.service ';
import { Menu, ArticleUi } from 'src/app/models/ui';

@Component({
  selector: 'app-categories-tab',
  templateUrl: 'categories-tab.page.html',
  styleUrls: ['categories-tab.page.scss']
})
export class CategoriesTabPage {
  articles: ArticleUi[];
  error = false;
  categories: Menu[] = [{
    id: 'business',
    title: 'CATEGORIES.BUSINESS'
  }, {
    id: 'entertainment',
    title: 'CATEGORIES.ENTERTAINMENT'
  }, {
    id: 'general',
    title: 'CATEGORIES.GENERAL'
  }, {
    id: 'health',
    title: 'CATEGORIES.HEALTH'
  }, {
    id: 'science',
    title: 'CATEGORIES.SCIENCE'
  },{
    id: 'sports',
    title: 'CATEGORIES.SPORTS'
  },{
    id: 'technology',
    title: 'CATEGORIES.TECHNOLOGY'
  }
  ];
  categorySelected: string;
  firstLoading: boolean;
  scrollPosition = 0;
  scrollingDown = false;
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
        tap(_ => {
          if(this.articles) {
            this.getHeadlinesByCategory(this.categorySelected);
          }
        }),
        takeUntil(this.ngUnsubscribe)
      )  
      .subscribe();
    this.storageService.favoritesChanges$
      .pipe(
        tap(_ => this.updateFavorites()),
        takeUntil(this.ngUnsubscribe))  
      .subscribe();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ionViewWillEnter() {
    this.getHeadlinesByCategory(this.categorySelected);
  }

  onScroll(e) : void {
    this.scrollingDown = this.scrollPosition < e.detail.scrollTop;
    this.scrollPosition = e.detail.scrollTop;
    console.log('onScroll cat', e);
  }


  onCategoryChanged(categoryId) {
    this.categorySelected = categoryId;
    this.getHeadlinesByCategory(this.categorySelected);
  }

  onToggleFavorite(article: ArticleUi) {
    this.storageService.toggleFavorite(article.article)
      .then(_ => {
        article.selected = !article.selected;
        this.animationsService.starAnimation(article.id).play();
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
    this.articles?.forEach(article => {
      article.selected = this.storageService.favoritesHeadlines.some(favNew => article.article.title === favNew.title)
    });
  }

}
