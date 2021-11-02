import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainTabPage } from './main-tab.page';
import { MainTabPageRoutingModule } from './main-tab-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    MainTabPageRoutingModule,
    SharedModule,
  ],
  declarations: [MainTabPage]
})
export class MainTabPageModule {}
