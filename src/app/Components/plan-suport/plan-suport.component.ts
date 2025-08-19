import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserTokenInterface } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

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

  token!: string | null;

  constructor(private authService: AuthService) {}

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

  suportPopUpVisible = true;
  confirmationPopUpVisible = false;

  erroInForm = false;
  legalNatures = ['MEI', 'SA', 'EI', 'SLU', 'LTDA', 'OUTRA'];
  monthlyReportsOptions = ['BÁSICO', 'COMPLETO', 'AVANÇADO', 'NENHUMA'];

  nameBusiness = '';
  subject = '';
  observations = '';
  businessArea = '';
  legalNature = '';
  monthlyReports = '';
  annualBilling = '';
  qtyProducts = '';
  preferLayout = '';

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
          title: 'Faça Login para enviar!',
          showConfirmButton: false,
          timer: 3000, 
          timerProgressBar: true  
      });
    }
  }

  toggleComponent(plan: string) {
    if (plan === 'suport') {
      this.suportPopUpVisible = !this.suportPopUpVisible;
      this.confirmationPopUpVisible = false;
    } else if (plan === 'confirmation') {
      this.confirmationPopUpVisible = !this.confirmationPopUpVisible;
      this.suportPopUpVisible = false;
    }
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'void' && this.confirmationPopUpVisible === false) {
      this.closePlan.emit();
    }
  }
}