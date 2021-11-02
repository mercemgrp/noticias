import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Subject } from 'rxjs';
import { first, finalize, tap, map, takeUntil } from 'rxjs/operators';
import { AnimationsService } from 'src/app/services/animations.service';
import { ConfigService } from 'src/app/services/config.service';
import { NewsService } from 'src/app/services/news.service';
import { StorageService } from 'src/app/services/storage.service ';
import { SourceDTO } from 'src/app/models/dtos';
import { ArticlesConfig, ArticleUi, Menu } from 'src/app/models/ui';
@Component({
  selector: 'app-fonts-tab',
  templateUrl: 'fonts-tab.page.html',
  styleUrls: ['fonts-tab.page.scss']
})
export class FontsTabPage {
  currentFont: SourceDTO;
  articles: ArticleUi[];
  articlesConfig: ArticlesConfig = {
    hideFont: true
  }
  error = false;
  sources: SourceDTO[];
  menus: Menu[] = [{
    id: 'test',
    title: '         '
  }, {
    id: 'test',
    title: '         '
  }];
  fontSelected: string;
  firstLoading: boolean;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private configService: ConfigService,
    private newsService: NewsService,
    private storageService: StorageService,
    private animationsService: AnimationsService,
    private iab: InAppBrowser) {
  }

  ngOnInit() {
    this.configService.languageChanges$
      .pipe(
        tap(_ => {
          if (this.sources) {
            this.getSources();
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
    if (!this.sources) {
      this.getSources()
    } else {
      this.getHeadlinesByDomain(this.fontSelected);
    }
  }

  onFontChanged(fontId) {
    if (fontId === this.fontSelected) {
      return;
    }
    this.fontSelected = fontId;
    this.setCurrentFont();
    this.getHeadlinesByDomain(this.fontSelected);
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
    this.getHeadlinesByDomain(this.fontSelected, e);
  }

  openUrl(url) {
    this.iab.create(url, '_system');
  }

  private getSources() {
    this.firstLoading = true;
    this.newsService.getSources()
    .pipe(
      first(),
      map(resp => {
        this.sources = [...resp];
        this.menus = resp.map(source => {
          return {
            id: source.id,
            title: source.name
          }
        });
        debugger;
        this.fontSelected = this.menus[0]?.id;
        this.setCurrentFont();
        this.getHeadlinesByDomain(this.fontSelected);
      })).subscribe();
  }

  private getHeadlinesByDomain(domainId, e?) {
    if (!e) {
      this.firstLoading = true;
      this.articles = [];
    }
    this.newsService.getHeadlinesByDomain(domainId, !!!e)
      .pipe(
        first(),
        finalize(() => {
          debugger;
          this.firstLoading = false;
          if (e) {
            e.target.complete();
          }
        })
      ).subscribe(
        news => {
          debugger;
          this.articles.push( ...news.map((currentNew, i) => {
            return {
              id: 'fontId_' + this.fontSelected +'_' + this.articles.length + i,
              selected: this.storageService.favoritesHeadlines.some(favNew => currentNew.title === favNew.title),
              article: currentNew
            }
          }));
          if (!news.length && e) {
            e.target.disabled = true;
          }
          debugger;
          
        },
        _ => this.error = true
      );
  }

  private setCurrentFont() {
    this.currentFont = this.sources.find(source => source.id === this.fontSelected);
  }

  private updateFavorites() {
    this.articles?.forEach(article => {
      article.selected = this.storageService.favoritesHeadlines.some(favNew => article.article.title === favNew.title)
    });
  }

}
