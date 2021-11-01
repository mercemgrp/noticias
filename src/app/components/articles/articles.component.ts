import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleUi, ArticlesConfig } from 'src/app/models/ui';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  @Input() articles: ArticleUi[];
  @Input() config: ArticlesConfig;
  @Output() toggleFavoriteEv = new EventEmitter();
  constructor() { }

  onAddToFavorite(ev) {
    this.toggleFavoriteEv.emit(ev);
  }

}
