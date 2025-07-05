import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-plan-suport',
  templateUrl: './plan-suport.component.html',
  styleUrls: ['./plan-suport.component.css'],
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
export class PlanSuportComponent {
  @Input() username: string | null = null;
  @Input() email: string | null = null;
  @Output() closePlan = new EventEmitter<void>();

  visible = true;

  closeComponent() {
    this.visible = false;
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.closePlan.emit();
    }
  }
}
