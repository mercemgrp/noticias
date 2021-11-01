import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ArticleUi } from 'src/app/models/articleUi';
import { ArticleDTO } from 'src/app/models/dtos/news';
import { AnimationsService } from 'src/app/services/animations.service';
import { StorageService } from 'src/app/services/storage.service ';

@Component({
  selector: 'app-favorites-tab',
  templateUrl: 'favorites-tab.page.html',
  styleUrls: ['favorites-tab.page.scss']
})
export class FavoritesTabPage {
  favorites: ArticleUi[];
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
      .pipe(tap(favAction => this.updateFavorites(favAction)))  
      .subscribe();

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onToggleFavorite(event: ArticleUi) {
    this.storageService.toggleFavorite(event.article)
      .then(_ => {
        this.animationService.deleteCartAnimation(event.id).play().then(
          resp => this.favorites = this.favorites.filter(fav => fav.id !== event.id)
        );
      })
      .catch(() => console.log('Mostrar error'))
      .finally(() => this.firstLoading = false);
  }

  private setFavorites() {
    this.favorites =  this.storageService.favoritesHeadlines.map((currentNew, i) => {
      return {
        id: 'favorites_' + i,
        selected: true,
        article: currentNew
      }
    })
  }
    
  private updateFavorites(favAction: {article: ArticleDTO, action: string}) {
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
            id: 'favorites_' + this.favorites.length
          })
        }
        break;
      default:
        break;
    }
  }  

}
