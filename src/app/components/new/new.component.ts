import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { Article, ArticleSelected } from 'src/app/models/news';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() article: Article;
  @Output() addToFavoriteEv = new EventEmitter<ArticleSelected>();
  constructor(private iab: InAppBrowser) { }

  ngOnInit() {}

  onOpenLink(url) {
    this.openUrl(url);
  }

  onAddToFavorite() {
    this.addToFavoriteEv.emit({
      id: this.article.id,
      isSelected: this.article.selected
    });
  }

  private openUrl(url) {
    const browser = this.iab.create(url, '_system');
}
}
