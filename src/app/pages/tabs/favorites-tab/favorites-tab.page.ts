import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ArticleDTO } from 'src/app/shared/models/dtos';
import { ArticleUi, ArticlesConfig } from 'src/app/shared/models/ui';
import { AnimationsService } from 'src/app/shared/services/animations.service';
import { StorageService } from 'src/app/shared/services/storage.service ';

@Component({
  selector: 'app-favorites-tab',
  templateUrl: 'favorites-tab.page.html',
  styleUrls: ['favorites-tab.page.scss']
})
export class FavoritesTabPage {
  favorites: ArticleUi[];
  articlesConfig: ArticlesConfig = {
    hideFavoriteInfo: true
  };
  error: boolean;
  firstLoading: boolean;
  scrollPosition = 0;
  scrollingDown = false;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private storageService: StorageService,
    private animationService: AnimationsService) {
    
  }

  ngOnInit() {
    this.setFavorites();
    this.storageService.favoritesChanges$
      .pipe(
        tap(favAction => this.updateFavorites(favAction)),
        takeUntil(this.ngUnsubscribe))  
      .subscribe();

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onScroll(e) : void {
    this.scrollingDown = this.scrollPosition < e.detail.scrollTop;
    this.scrollPosition = e.detail.scrollTop;
  }


  onToggleFavorite(event: ArticleUi) {
    this.storageService.toggleFavorite(event.article)
      .then(_ => this.animationService.deleteCartAnimation(event.id).play())
      .catch(() => console.log('Mostrar error'));
  }

  private setFavorites() {
    this.favorites =  this.storageService.favoritesHeadlines.map((currentNew, i) => {
      return {
        id: 'favorites-' + this.getRandomStr(),
        selected: true,
        article: currentNew
      }
    })
  }
    
  private updateFavorites(favAction: {article: ArticleDTO, action: string}) {
    if (!this.favorites) {
      return;
    }
    switch(favAction?.action) {
      case 'DELETE':
        const favoriteIndex = this.favorites.findIndex(fav => fav.article.title === favAction.article.title);
        if (favoriteIndex > -1) {
          this.favorites.splice(favoriteIndex, 1);
        }
        break;
      case 'ADD':
        if (!this.favorites.some(fav => fav.article.title === favAction.article.title)) {
          this.favorites.unshift({
            article: favAction.article,
            selected: true,
            id: 'favorites-' + this.getRandomStr()
          })
        }
        break;
      default:
        break;
    }
  } 

  private getRandomStr() {
    return (Math.random() + 1).toString(36).substring(2);
  }

}
