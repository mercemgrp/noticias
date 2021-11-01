import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTabPage } from './main-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MainTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainTabPageRoutingModule {}
