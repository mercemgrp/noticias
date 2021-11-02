import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { NewSkeletonComponent } from './new-skeleton/new-skeleton.component';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
    AlertComponent,
    NewSkeletonComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    ArticlesComponent,
    AlertComponent,
    NewSkeletonComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
