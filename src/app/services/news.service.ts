import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createAnimation } from '@ionic/angular';
import {  Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NewsDTO, ArticleDTO } from '../models/dtos/news';
import { SourceDTO, SourcesDTO } from '../models/dtos/sources';
import { ConfigService } from './config.service';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private topHeadlinesPage = 0;
  private headlinesByCategoryPage = 0;
  private headlinesByDomainPage = 0;
  private sources: SourceDTO[];
  
  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService,
    private configService: ConfigService) {
    }

  getSources(): Observable<SourceDTO[]> {
    return this.get<SourcesDTO>(`top-headlines/sources?language=${this.configService.language}`)
    .pipe(catchError(() => {
      return of({
        sources: [],
        status: 'error'
      });
    } ))
    .pipe(map((resp: SourcesDTO) => {
      this.sources = resp.sources;
      return this.sources;
    }))
  }

  getTopHeadlines(reset=true): Observable<ArticleDTO[]> {
    reset ? this.topHeadlinesPage= 1 : this.topHeadlinesPage++;
    return this.get<NewsDTO>(`top-headlines?language=${this.configService.language}&page=${this.topHeadlinesPage}`)
      .pipe(catchError(() => {
        return of({articles: []} as NewsDTO);
      } ))
      .pipe(map((resp: NewsDTO) => this.manageResponse(resp)));
  }

  getHeadlinesByCategory(category: string, reset=true): Observable<ArticleDTO[]> {
    reset ? this.headlinesByCategoryPage=1 : this.headlinesByCategoryPage++;
    return this.get<ArticleDTO[]>(`top-headlines?language=${this.configService.language}&category=${category}&page=${this.headlinesByCategoryPage}`)
    .pipe(catchError(() => {
      return of({articles: []} as NewsDTO);
    } ))
      .pipe(map((resp: NewsDTO) => this.manageResponse(resp)));
  }

  getHeadlinesByDomain(domain: string, reset=true): Observable<ArticleDTO[]> {
    reset ? this.headlinesByDomainPage=1 : this.headlinesByDomainPage++;
    return this.get<ArticleDTO[]>(`top-headlines?language=${this.configService.language}&sources=${domain}&page=${this.headlinesByDomainPage}`)
    .pipe(catchError(() => {
      return of({articles: []} as NewsDTO);
    } ))
      .pipe(map((resp: NewsDTO) => this.manageResponse(resp)));
  }

  private manageResponse(resp: NewsDTO): ArticleDTO[] {
    if (resp.status !== 'ok') {
      return [];
    } else {
      return resp.articles || [];
    }
  }

  
  private get<T>(url: string) {
    const apiKey = this.environmentService.apiKey;
    const apiUrl = this.environmentService.apiUrl;
    const header = new HttpHeaders({
      'X-Api-Key': apiKey
    });
    // return this.http.get(this.getMockUrl(url))
    return this.http.get(apiUrl + url, {headers: header});
    
  }

  private getMockUrl(url: string) {
    const params = url.split('?')[1];
    let base = 'assets/mocks/' + url.split('?')[0];
    if(params?.includes('category')) {
      base = base +'-category';
    }
    if(params?.includes('sources')) {
      base = base +'-sources';
    }
    return base + '.json';
  }
}
