import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontsTabPage } from './fonts-tab.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FontsTabPageRoutingModule } from './fonts-tab-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    FontsTabPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FontsTabPage]
})
export class FontsTabPageModule {}
