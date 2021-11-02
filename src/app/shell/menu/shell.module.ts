import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    MenuComponent
  ]
})
export class ShellModule { }
