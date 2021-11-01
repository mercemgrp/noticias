import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabsMenu = [
    {
      id: 'articles',
      title: 'Noticias',
      route: '/tabs/articles',
      icon: 'newspaper',
      iconSelected: 'newspaper-outline'
    },
    {
      id: 'headers',
      title: 'Encabezados',
      route: '/tabs/headers',
      icon: 'ellipse',
      iconSelected: 'ellipse-outline'
    },
    {
      id: 'fonts',
      title: 'Fuentes',
      route: '/tabs/fonts',
      icon: 'book',
      iconSelected: 'book-outline'
    },
    {
      id: 'favorites',
      title: 'Favoritos',
      route: '/tabs/favorites',
      icon: 'star',
      iconSelected: 'star-outline'
    }
  ];
  tabSelected;
  constructor(private router: Router) {
    this.tabSelected = this.tabsMenu.find(tab => tab.route === this.router.url)?.id || this.tabsMenu[0];
  }

  onSelectTab(event) {
    this.tabSelected = event?.currentTarget?.tab || this.tabSelected;
    console.log(this.tabSelected);
  }
  

}
