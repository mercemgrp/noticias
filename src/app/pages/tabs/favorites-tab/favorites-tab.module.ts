import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { FavoritesTabPage } from './favorites-tab.page';
import { FavoritesTabPageRoutingModule } from './favorites-tab-routing.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    FavoritesTabPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FavoritesTabPage]
})
export class FavoritesTabPageModule {}
