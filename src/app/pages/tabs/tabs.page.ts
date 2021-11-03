import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabMenu } from 'src/app/shared/models/ui/tabs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabsMenu: TabMenu[] = [
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
  tabSelected: TabMenu;
  scrollPosition = 0;
  scrollingDown = false;
  constructor(
    private router: Router
  ) {
    this.tabSelected = this.tabsMenu.find(tab => tab.route === this.router.url) || this.tabsMenu[0];
  }

  onScroll(e) : void {
    this.scrollingDown = this.scrollPosition < e.detail.scrollTop;
    this.scrollPosition = e.detail.scrollTop;
  }

  onSelectTab(e) {
    const tabId = e?.currentTarget?.tab;
    this.tabSelected = tabId ? this.tabsMenu.find(tab => tab.id === tabId) : null;
  }
  

}
