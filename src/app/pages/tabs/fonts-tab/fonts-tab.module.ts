import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontsTabPage } from './fonts-tab.page';
import { FontsTabPageRoutingModule } from './fonts-tab-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    FontsTabPageRoutingModule,
    SharedModule
  ],
  providers: [],
  declarations: [FontsTabPage]
})
export class FontsTabPageModule {}
