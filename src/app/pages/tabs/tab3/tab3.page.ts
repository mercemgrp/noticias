import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, first, takeUntil } from 'rxjs/operators';
import { Article, ArticleSelected } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  articles: Article[];
  error: boolean;
  private ngUnsubscribe = new Subject<void>();
  constructor(private newsService: NewsService) {
    
  }

  ngOnInit() {
    this.getFavoritesSubscription();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onAddToFavorite($event: ArticleSelected) {
    try {
     this.newsService.addToFavorite($event);
    } catch(e) {
      // Mensaje de error;
    }
  }

  private getFavoritesSubscription() {
    this.newsService.articles$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((articles) => {
        this.articles = this.newsService.getFavoritesHeadlines();
      });
  }

}
