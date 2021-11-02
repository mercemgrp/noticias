import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesTabPage } from './categories-tab.page';

import { ComponentsModule } from 'src/app/components/components.module';
import { CategoriesTabPageRoutingModule } from './categories-tab-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    CategoriesTabPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CategoriesTabPage]
})
export class CategoriesTabPageModule {}
