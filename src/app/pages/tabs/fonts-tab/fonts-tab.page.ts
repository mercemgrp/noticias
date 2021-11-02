import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Subject } from 'rxjs';
import { first, finalize, tap, map, takeUntil } from 'rxjs/operators';
import { SourceDTO } from 'src/app/shared/models/dtos';
import { ArticleUi, ArticlesConfig, Menu } from 'src/app/shared/models/ui';
import { AnimationsService } from 'src/app/shared/services/animations.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { NewsService } from 'src/app/shared/services/news.service';
import { StorageService } from 'src/app/shared/services/storage.service ';
@Component({
  selector: 'app-fonts-tab',
  templateUrl: 'fonts-tab.page.html',
  styleUrls: ['fonts-tab.page.scss']
})
export class FontsTabPage {
  @ViewChild("headerTmpl") header: HTMLElement;
  currentFont: SourceDTO;
  articles: ArticleUi[];
  articlesConfig: ArticlesConfig = {
    hideFont: true
  }
  error = false;
  sources: SourceDTO[];
  menus: Menu[] = [{
    id: 'test',
    title: ' '
  }];
  fontSelected: string;
  firstLoading: boolean;
  scrollPosition = 0;
  scrollingDown = false;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private configService: ConfigService,
    private newsService: NewsService,
    private storageService: StorageService,
    private animationsService: AnimationsService,
    private iab: InAppBrowser,
    public element: ElementRef, 
    public renderer: Renderer2
) {
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

  onScroll(e) : void {
    this.scrollingDown = this.scrollPosition < e.detail.scrollTop;
    this.scrollPosition = e.detail.scrollTop;
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
          this.firstLoading = false;
          if (e) {
            e.target.complete();
          }
        })
      ).subscribe(
        news => {
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
        },
        _ => this.error = true
      );
  }

  private setCurrentFont() {
    this.currentFont = this.sources?.find(source => source.id === this.fontSelected);
  }

  private updateFavorites() {
    this.articles?.forEach(article => {
      article.selected = this.storageService.favoritesHeadlines.some(favNew => article.article.title === favNew.title)
    });
  }

}
