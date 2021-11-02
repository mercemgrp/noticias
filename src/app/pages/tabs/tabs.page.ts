import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabsMenu = [
    {
      id: 'articles',
      title: 'SECTIONS.ARTICLES',
      route: '/tabs/articles',
      icon: 'newspaper',
      iconSelected: 'newspaper-outline'
    },
    {
      id: 'headers',
      title: 'SECTIONS.HEADERS',
      route: '/tabs/headers',
      icon: 'ellipse',
      iconSelected: 'ellipse-outline'
    },
    {
      id: 'fonts',
      title: 'SECTIONS.FONTS',
      route: '/tabs/fonts',
      icon: 'book',
      iconSelected: 'book-outline'
    },
    {
      id: 'favorites',
      title: 'SECTIONS.FAVORITES',
      route: '/tabs/favorites',
      icon: 'star',
      iconSelected: 'star-outline'
    }
  ];
  tabSelected;
  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
    this.tabSelected = this.tabsMenu.find(tab => tab.route === this.router.url)?.id || this.tabsMenu[0];
  }

  onSelectTab(event) {
    this.tabSelected = event?.currentTarget?.tab || this.tabSelected;
    console.log(this.tabSelected);
  }
  

}
