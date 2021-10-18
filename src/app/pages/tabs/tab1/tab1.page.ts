import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Article, ArticleSelected } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  articles: Article[] = [];
  error = false;
  constructor(
    private newsService: NewsService) {
  }


  ngOnInit() {
    this.getTopHeadlines();
  }

  onAddToFavorite(event: ArticleSelected) {
    try {
      this.articles = this.newsService.addToFavorite(event);
    } catch(e) {
      // Mensaje de error;
    }
  }

  getTopHeadlines(e?) {
    this.newsService.getTopHeadlines()
      .pipe(
        first(),
      ).subscribe(
        news => {
          this.articles.push(...news);
          if (!news.length && e) {
            e.target.disabled = true;
          }
          if (e) {
            e.target.complete();
          }
        },
        _ => this.error = true
      );
  }

}
