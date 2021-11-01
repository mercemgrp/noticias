import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AnimationsService } from 'src/app/services/animations.service';
import { StorageService } from 'src/app/services/storage.service ';
import { ArticlesConfig, ArticleUi} from 'src/app/models/ui';
import { ArticleDTO } from 'src/app/models/dtos';

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
