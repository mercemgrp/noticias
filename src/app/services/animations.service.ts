import { Injectable } from '@angular/core';
import { createAnimation } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  heartAnimation(id) {
    return createAnimation()
    .addElement(document.querySelector('.star-icon_' + id))
    .duration(1000)
    .keyframes([
      {offset: 0, width: '10%', height: '10%', opacity: 0.2},
      {offset: 0.5, width:'100%', height: '100%', opacity: 1},
      {offset: 1, width:'10%', height: '10%', opacity: 0.2}
    ])
    .beforeRemoveClass('ion-hide')
    .afterAddClass('ion-hide');
  }

  deleteCartAnimation(id) {
    return createAnimation()
    .addElement(document.querySelector('.article-container-' + id))
    .duration(1000)
    .fromTo('transform', 'translateX(0%)', 'translateX(100%)');
  } 

}
