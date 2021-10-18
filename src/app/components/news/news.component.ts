import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() news: Article[];
  @Output() addToFavoriteEv = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  onAddToFavorite(ev) {
    this.addToFavoriteEv.emit(ev);
  }

}
