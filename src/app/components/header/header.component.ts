import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IonSegment, MenuController } from '@ionic/angular';
import { Menu } from 'src/app/models/ui';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild(IonSegment) segment: IonSegment;

  @Input() title: string;
  @Input() menus: Menu[];
  @Output() menuChangesEv = new EventEmitter();

  constructor(private menu: MenuController) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.menus?.length) {
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

  }
  
  onOpenMainMenu() {
    this.menu.enable(true);
    this.menu.open('mainMenu');
  }

  onMenuChanges(e) {
    this.menuChangesEv.emit(e.detail.value);
  }

}
