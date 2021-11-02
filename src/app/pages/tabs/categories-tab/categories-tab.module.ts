import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesTabPage } from './categories-tab.page';
import { CategoriesTabPageRoutingModule } from './categories-tab-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    CategoriesTabPageRoutingModule,
    SharedModule
  ],
  declarations: [CategoriesTabPage]
})
export class CategoriesTabPageModule {}
