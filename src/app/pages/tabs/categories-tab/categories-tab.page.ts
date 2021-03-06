import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { first, finalize, tap, takeUntil } from 'rxjs/operators';
import { ArticleUi, Menu } from 'src/app/shared/models/ui';
import { AnimationsService } from 'src/app/shared/services/animations.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { NewsService } from 'src/app/shared/services/news.service';
import { FavoritesStorageService } from 'src/app/shared/services/favorites-storage.service ';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
    private storageService: FavoritesStorageService,
    private animationsService: AnimationsService,
    private toastController: ToastController,
    private translate: TranslateService) {
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
      .catch(_ => this.presentToast())
  }

  onLoadNextHeadlines(e) {
    this.getHeadlinesByCategory(this.categorySelected, e);
  }

  private async presentToast() {
    const toast = await this.toastController.create({
      color: 'secondary',
      animated: true,
      cssClass: 'my-toast',
      message: this.translate.instant('MESSAGES.ERROR'),
      duration: 2000
    });
    toast.present();
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
