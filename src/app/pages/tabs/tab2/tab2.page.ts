import { Component, ViewChild } from '@angular/core';
import { IonSegment, LoadingController } from '@ionic/angular';
import { first, finalize } from 'rxjs/operators';
import { Article, ArticleSelected } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonSegment) segment: IonSegment;
  articles: Article[] = [];
  error = false;
  categories = ['business', 'entertainment'];
  categorySelected: string;
  loading: boolean;
  constructor(
    private newsService: NewsService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.segment.value = this.categories[0];
      this.categorySelected = this.segment.value;
      this.getHeadlinesByCategory(this.categorySelected);
    });
  }

  onCategoryChanged($event) {
    debugger;
    this.categorySelected = $event.detail.value;
    this.articles = [];
    this.getHeadlinesByCategory(this.categorySelected);
  }

  onAddToFavorite($event: ArticleSelected) {
    try {
      this.articles = this.newsService.addToFavorite($event);
    } catch(e) {
      // Mensaje de error;
    }
  }

  loadNextHeadlines(e) {
    debugger;
    this.getHeadlinesByCategory(this.categorySelected, e);
  }

  private getHeadlinesByCategory(category, e?) {
    this.loading  = true;
    return this.newsService.getHeadlinesByCategory(category, !!!e)
      .pipe(
        first(),
        finalize(() => this.loading = false)
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
