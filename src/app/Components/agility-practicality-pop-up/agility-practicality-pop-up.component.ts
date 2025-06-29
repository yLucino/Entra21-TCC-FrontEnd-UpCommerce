import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-agility-practicality-pop-up',
  templateUrl: './agility-practicality-pop-up.component.html',
  styleUrls: ['./agility-practicality-pop-up.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.55)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.55)' }))
      ]),
    ])
  ]
})
export class AgilityPracticalityPopUpComponent {
@Output() close = new EventEmitter<void>();
  visible = true;

  closePopup() {
    this.visible = false;
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.close.emit();
    }
  }
}
