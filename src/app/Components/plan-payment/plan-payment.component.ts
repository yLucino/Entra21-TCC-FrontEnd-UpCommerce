import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserTokenInterface } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-payment',
  templateUrl: './plan-payment.component.html',
  styleUrls: ['./plan-payment.component.css'],
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
export class PlanPaymentComponent {
  @Input() price: number | null = null;
  @Input() title: string | null = null;
  @Input() numOrder: string | null = '12345678';
  @Output() closePlan = new EventEmitter<void>();

  constructor(private authService: AuthService) {}
  
  username!: string;
  email!: string;
  token!: string | null;

  ngOnInit() {
    this.authService.user$.subscribe((data: UserTokenInterface | null) => {
      if (data) {
        this.username = data.user.name;
        this.email = data.user.email;
        this.token = data.token;
      }
      else {
        this.token = null;
      }
    });
  }

  erroInForm = false;
  fullName: string = '';
  creditCard: string = '';
  ccv: string = '';
  expirationDate: string = '';

  totalICMS: number | null = null;
  totalPrice: number | null = null;
  confirmationPopUpVisible = false;
  planPaymentVisible = true;

  sendForm(form: NgForm) {
    if (form.valid && this.token != null) {
      this.toggleComponent('confirmation');
    } else if (!form.valid) {
      this.erroInForm = true;
    } else {
      Swal.fire({
          toast: true,            
          position: 'top-end',    
          icon: 'warning',    
          title: 'Faça Login para concluir!',
          showConfirmButton: false,
          timer: 3000, 
          timerProgressBar: true  
      });
    }
  }

  toggleComponent(plan: string) {
    if (plan === 'payment') {
      this.planPaymentVisible = !this.planPaymentVisible;
      this.confirmationPopUpVisible = false;
    } else if (plan === 'confirmation') {
      this.confirmationPopUpVisible = !this.confirmationPopUpVisible;
      this.planPaymentVisible = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['price'] && this.price !== null) {
      this.totalICMS = parseFloat((this.price * 0.2).toFixed(2));
      this.totalPrice = parseFloat((this.price + this.totalICMS).toFixed(2));
    }
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'void'  && this.confirmationPopUpVisible === false) {
      this.closePlan.emit();
    }
  }
}
