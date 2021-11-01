import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Share } from '@capacitor/share';
import { ActionSheetController } from '@ionic/angular';
import { ArticlesConfig, ArticleUi } from 'src/app/models/ui';
import { ArticleDTO } from 'src/app/models/dtos';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article: ArticleUi;
  @Input() config: ArticlesConfig;
  @Output() toggleFavoriteEv = new EventEmitter<ArticleUi>();

  articleDTO: ArticleDTO;

  constructor(
    private iab: InAppBrowser,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.articleDTO = this.article.article;
  }


  onToggleFavorite() {
    if (!this.config.hideFavoriteInfo) {
      this.emitFavoriteEvent();
    }
  }

  onOpenUrl() {
    this.openUrl(this.articleDTO.url);
  }

  onShowMenu(e) {
    this.showMenu();
  }

  onShare() {
    Share.share({
      title: '¡Te comparto esta noticia!',
      text: '',
      url: this.articleDTO.url,
      dialogTitle: ''
    }).then(_ => console.log('shared'));
  }

  private async showMenu() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Opciones',
        cssClass: 'my-action-sheet',
        buttons: [{
          text: this.article.selected ? 'Eliminar de favoritos' : 'Añadir a favoritos',
          icon: this.article.selected ? 'star' : 'star-outline',
          handler: () => this.emitFavoriteEvent()
        }, {
          text: 'Ir a la noticia',
          icon: 'document-text-outline',
          handler: () => this.onOpenUrl()
        }, {
          text: 'Compartir',
          icon: 'share-social-outline',
          handler: () => this.onShare()
        },{
          text: 'Cerrar',
          icon: 'close',
          role: 'cancel',
          handler: () => console.log('Cancel clicked')
        }]
      });
      await actionSheet.present();
  
      const { role } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
  }
  private openUrl(url) {
    this.iab.create(url, '_system');
  }

  private emitFavoriteEvent() {
    this.toggleFavoriteEv.emit(this.article);
  }
}
