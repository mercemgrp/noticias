
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, first, finalize, takeUntil } from 'rxjs/operators';
import { ArticleUi } from 'src/app/shared/models/ui';
import { AnimationsService } from 'src/app/shared/services/animations.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { NewsService } from 'src/app/shared/services/news.service';
import { StorageService } from 'src/app/shared/services/storage.service ';

@Component({
  selector: 'app-main-tab',
  templateUrl: 'main-tab.page.html',
  styleUrls: ['main-tab.page.scss']
})
export class MainTabPage implements OnInit {
  articles: ArticleUi[];
  error = false;
  firstLoading = false;
  scrollPosition = 0;
  scrollingDown = false;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private newsService: NewsService,
    private storageService: StorageService,
    private configService: ConfigService,
    private animationsService: AnimationsService) {
  }
  ngOnInit() {
    this.configService.languageChanges$
      .pipe(
        tap(_ => {
          if(this.articles) {
            this.getTopHeadlines();
          }
        }),
        takeUntil(this.ngUnsubscribe))  
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
    this.getTopHeadlines();  
  }

  onScroll(e) : void {
    this.scrollingDown = this.scrollPosition < e.detail.scrollTop;
    this.scrollPosition = e.detail.scrollTop;
    console.log('onScroll main', e);
  }

  onToggleFavorite(article: ArticleUi) {
    this.storageService.toggleFavorite(article.article)
      .then(_ => {
        article.selected = !article.selected;
        this.animationsService.starAnimation(article.id).play();
      })
      .catch(_ => console.log('Mostrar error'));
  }

  getTopHeadlines(e?) {
    if (!e) {
      this.firstLoading = true;
      this.articles = [];
    }
    this.newsService.getTopHeadlines(!e)
      .pipe(
        first(),
        tap(news => {
          this.articles.push( ...news.map((currentNew, i) => {
            return {
              id: 'all_' + this.articles.length + i,
              selected: this.storageService.favoritesHeadlines.some(favNew => currentNew.title === favNew.title),
              article: currentNew
            }
          }));
          if (!news.length && e) {
            e.target.disabled = true;
          }
        }),
        finalize(() => {
          this.firstLoading = false;
          if (e) {
            e.target.complete();
          }
        })
      ).subscribe(
        () => {},
        _ => this.error = true
      );
  }

  private updateFavorites() {
    this.articles?.forEach(article => {
     article.selected = this.storageService.favoritesHeadlines.some(favNew => article.article.title === favNew.title)
    });
  }

}
