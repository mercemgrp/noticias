import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArticleDTO } from '../models/dtos/articles-dto';

const FAVORITES_KEY = 'favorites-news';
@Injectable({
  
  providedIn: 'root'
})
export class FavoritesStorageService {
  get favoritesHeadlines() {
    return [...this.favorites];
  }
  get configutation() {
    return {}
  }
  private favorites: ArticleDTO[];
  private favoritesChangesSubject =  new BehaviorSubject<{article: ArticleDTO, action: string}>(undefined);
  favoritesChanges$: Observable<{article: ArticleDTO, action: string}>;
  constructor(private storage: Storage) {
    this.favoritesChanges$ = this.favoritesChangesSubject.asObservable();
  }

  loadFavorites(): Promise<boolean> {
      return this.storage.get(FAVORITES_KEY).then(
        (resp: ArticleDTO[]) => {
          this.favorites = resp || [];
          return true;
        }
      );
  }

  toggleFavorite(articleSelected: ArticleDTO): Promise<ArticleDTO[]> {
    const existFavorite = this.favorites.some(elem => elem.title === articleSelected.title);
      let data = this.favorites;
      if (existFavorite) {
        data = this.favorites.filter(elem => elem.title !== articleSelected.title);
      } else {
        data.unshift(articleSelected);
      }
      return this.storage.set(FAVORITES_KEY,data)
        .then(favorites => {
          this.favorites = [...favorites];
          setTimeout(() => {
            this.favoritesChangesSubject.next({article: articleSelected, action: existFavorite ? 'DELETE' : 'ADD'});
          }, 1000);
          return this.favorites;
        }).catch(_ => {
          return this.favorites;
        });
  }
}
