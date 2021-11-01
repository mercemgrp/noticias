import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainTabPage } from './main-tab.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MainTabPageRoutingModule } from './main-tab-routing.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MainTabPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [MainTabPage]
})
export class MainTabPageModule {}
