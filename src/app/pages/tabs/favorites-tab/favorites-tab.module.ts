import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesTabPage } from './favorites-tab.page';
import { FavoritesTabPageRoutingModule } from './favorites-tab-routing.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    FavoritesTabPageRoutingModule,
    SharedModule
  ],
  declarations: [FavoritesTabPage]
})
export class FavoritesTabPageModule {}
