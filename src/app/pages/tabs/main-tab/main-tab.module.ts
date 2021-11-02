import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainTabPage } from './main-tab.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MainTabPageRoutingModule } from './main-tab-routing.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    MainTabPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [MainTabPage]
})
export class MainTabPageModule {}
