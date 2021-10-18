import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article, ArticleSelected, NewsDTO } from '../models/news';
import { EnvironmentService } from './environment.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private topHeadlinesPage = 0;
  private headlinesByCategoryPage = 0;
  private articles: Article[] = [];
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  articles$: Observable<Article[]>;
  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService) {
      this.articles$ = this.articlesSubject.asObservable();
    }

  getTopHeadlines(): Observable<Article[]> {
    this.topHeadlinesPage++;
    return this.exec<NewsDTO>(`top-headlines?language=es&page=${this.topHeadlinesPage}`)
      .pipe(catchError(() => {
        return of({articles: []} as NewsDTO);
      } ))
      .pipe(map((resp: NewsDTO) => {
        if (resp.status !== 'ok') {
          return [];
        } else {
          this.articles = resp?.articles.map(article => {
            return {
              ...article,
              id: Math.random(),
              selected: false
            } as Article;
          });
          this.articlesSubject.next(this.articles);
          return this.articles;
        }
      }));
  }

  getHeadlinesByCategory(category: string, reset=true): Observable<Article[]> {
    reset ? this.headlinesByCategoryPage=1 : this.headlinesByCategoryPage++;
    return this.exec<Article[]>(`top-headlines?language=es&category=${category}&page=${this.headlinesByCategoryPage}`)
    .pipe(catchError(() => {
      return of({articles: []} as NewsDTO);
    } ))
      .pipe(map((resp: NewsDTO) => {
        if (resp.status !== 'ok') {
          return [];
        } else {
          this.articles = resp?.articles.map(article => {
            return {
              ...article,
              id: Math.random(),
              selected: false
            } as Article;
          });
          this.articlesSubject.next(this.articles);
          return this.articles;
        }
      }));
  }

  getFavoritesHeadlines(): Article[] {
    return this.articles.filter(article => article.selected);
  }

  addToFavorite(articleSelected: ArticleSelected) {
    try {
      const article = this.articles.find(article => article.id === articleSelected.id);
      article.selected = !articleSelected.isSelected;
      this.articlesSubject.next(this.articles);
      return [...this.articles];
    } catch(e) {
      throw('Error');
    }
  }

  
  private exec<T>(url: string) {
    const apiKey = this.environmentService.apiKey;
    const apiUrl = this.environmentService.apiUrl;
    const header = new HttpHeaders({
      'X-Api-Key': apiKey
    });
    return this.http.get(apiUrl + url, {headers: header});
    
  }
}
