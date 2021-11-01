import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleUi } from 'src/app/models/articleUi';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() news: ArticleUi[];
  @Input() config = {
    showFont: true
  };
  @Output() toggleFavoriteEv = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  onAddToFavorite(ev) {
    this.toggleFavoriteEv.emit(ev);
  }

}
