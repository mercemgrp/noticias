import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-skeleton',
  templateUrl: './new-skeleton.component.html',
  styleUrls: ['./new-skeleton.component.scss'],
})
export class NewSkeletonComponent {
  get numberOfRowsArray() {
    const array = [];
    for( let i= 0; i<15; i++) {
      array.push(i);
    }
    return array;
  }
  constructor() { }
}
