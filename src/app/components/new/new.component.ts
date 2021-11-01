import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ArticleUi } from 'src/app/models/articleUi';
import { ArticleDTO } from 'src/app/models/dtos/news';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @ViewChild('heartIcon') heartIcon: ElementRef;
  @Input() article: ArticleUi;
  @Input() config;
  @Output() toggleFavoriteEv = new EventEmitter<ArticleUi>();

  articleDTO: ArticleDTO;

  constructor(
    private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.articleDTO = this.article.article;
  }


  onAddToFavorite() {
    this.emitFavoriteEvent();
  }

  onShowMenu(e) {
    this.showMenu();
  }

  private async showMenu() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Opciones',
        cssClass: 'my-action-sheet',
        buttons: [{
          text: this.article.selected ? 'Eliminar de favoritos' : 'Añadir a favoritos',
          icon: this.article.selected ? 'heart' : 'heart-outline',
          handler: () => this.onAddToFavorite()
        }, {
          text: 'Ir a la noticia',
          icon: 'document-text-outline',
          handler: () => this.openUrl(this.articleDTO.url)
        }, {
          text: 'Compartir',
          icon: 'share-social-outline',
          handler: () => {
            this.socialSharing.share('¡Mira esta noticia!' + this.articleDTO.title);
          }
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
