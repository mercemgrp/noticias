import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'articles',
        loadChildren: () => import('./main-tab/main-tab.module').then(m => m.MainTabPageModule)
      },
      {
        path: 'headers',
        loadChildren: () => import('./categories-tab/categories-tab.module').then(m => m.CategoriesTabPageModule)
      },
      {
        path: 'fonts',
        loadChildren: () => import('./fonts-tab/fonts-tab.module').then(m => m.FontsTabPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('./favorites-tab/favorites-tab.module').then(m => m.FavoritesTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/articles',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/articles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
