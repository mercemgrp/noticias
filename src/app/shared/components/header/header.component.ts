import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IonSegment, MenuController } from '@ionic/angular';
import { Menu } from '../../models/ui';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild(IonSegment) segment: IonSegment;
  @Input() title: string;
  @Input() hide: boolean;
  @Input() menus: Menu[];
  @Input() id = (Math.random() + 1).toString(36).substring(2);
  @Output() menuChangesEv = new EventEmitter();
  style;
  constructor(
    private menu: MenuController) {}

  ngOnInit() {
    this.style = '';
    setTimeout(() => {
      if (this.menus?.length && this.segment) {
        this.segment.value = this.menus[0].id;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.menus?.currentValue) {
      if (this.menus?.length && this.segment) {
        this.segment.value = this.menus[0].id;
      }
    }
    if (changes.hide?.currentValue !== undefined && changes.hide.currentValue !== changes.hide?.previousValue) {
    }

  }
  
  onOpenMainMenu() {
    this.menu.enable(true);
    this.menu.open('mainMenu');
  }

  onMenuChanges(e) {
    this.menuChangesEv.emit(e.detail.value);
  }

}
