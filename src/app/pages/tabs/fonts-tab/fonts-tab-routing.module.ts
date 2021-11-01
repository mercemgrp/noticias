import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontsTabPage } from './fonts-tab.page';


const routes: Routes = [
  {
    path: '',
    component: FontsTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FontsTabPageRoutingModule {}
