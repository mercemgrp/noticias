import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { NewComponent } from './new/new.component';
import { IonicModule } from '@ionic/angular';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    NewComponent,
    NewsComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NewsComponent,
    AlertComponent
  ]
})
export class ComponentsModule { }
