import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent {
  @Output() closeRegister = new EventEmitter<void>();
  @Output() goToLogin = new EventEmitter<void>();

  visible = true;

  closeRegisterComponent() {
    this.visible = false;
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.closeRegister.emit();
    }
  }
}
