import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabSelected;
  constructor() {
    this.tabSelected = 'tab1';
  }

  onSelectTab(event) {
    this.tabSelected = event?.currentTarget?.tab || this.tabSelected;
    console.log(this.tabSelected);
  }

}
