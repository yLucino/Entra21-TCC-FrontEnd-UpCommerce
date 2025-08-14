import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { RegisterInterface } from 'src/app/interfaces/register.interface';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';

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

  erroInForm = false;
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  visible = true;

  constructor(private registerService: RegisterService) {}
  
  sendForm(form: NgForm) {
      if (form.valid) {  
        const data: RegisterInterface = {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        };
        
        this.registerService.register(data).subscribe({
          next: (response) => {
            Swal.fire({
              toast: true,            
              position: 'top-end',    
              icon: 'success',    
              title: 'Registro feito com sucesso',
              showConfirmButton: false,
              timer: 3000, 
              timerProgressBar: true  
            });
            this.closeRegisterComponent();
            console.log(response);
          },
          error: (er) => {
            Swal.fire({
              toast: true,            
              position: 'top-end',    
              icon: 'error',    
              title: 'Erro ao fazer registro',
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

  closeRegisterComponent() {
    this.visible = false;
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.closeRegister.emit();
    }
  }
}
