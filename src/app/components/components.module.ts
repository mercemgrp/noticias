import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { NewComponent } from './new/new.component';
import { IonicModule } from '@ionic/angular';
import { AlertComponent } from './alert/alert.component';
import { NewSkeletonComponent } from './new-skeleton/new-skeleton.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewComponent,
    NewsComponent,
    AlertComponent,
    NewSkeletonComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    NewsComponent,
    AlertComponent,
    NewSkeletonComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
