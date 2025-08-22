import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { LoginInterface } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

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

  constructor(private loginService: LoginService, private authService: AuthService) {}

  sendForm(form: NgForm) {
    if (form.valid) {
      const data: LoginInterface = {
        email: this.email,
        password: this.password
      };

      this.loginService.login(data).subscribe({
        next: (response) => {
          Swal.fire({
            toast: true,            
            position: 'top-end',    
            icon: 'success',    
            title: 'Login feito com sucesso!',
            showConfirmButton: false,
            timer: 3000, 
            timerProgressBar: true  
          });
          localStorage.setItem('token', response.token);
          this.authService.setUser(response);
          this.closeLoginComponent();
        },
        error: (er) => {
          Swal.fire({
            toast: true,            
            position: 'top-end',    
            icon: 'error',    
            title: 'Erro ao fazer login!',
            showConfirmButton: false,
            timer: 3000, 
            timerProgressBar: true 
          });
          console.log(er);
        }
      });
    }
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
