import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent {
  @Output() closeLogin = new EventEmitter<void>();
  @Output() goToRegister = new EventEmitter<void>();

  erroInForm = false;
  email: string = '';
  password: string = '';
  
  visible = true;

  sendForm(form: NgForm) {
    if (form.valid) {    }
    else {
      this.erroInForm = true;
    }
  }

  closeLoginComponent() {
    this.visible = false;
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.closeLogin.emit();
    }
  }
}
