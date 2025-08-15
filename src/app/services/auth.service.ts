import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<LoginResponse | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  setUser(user: LoginResponse) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    Swal.fire({
        toast: true,            
        position: 'top-end',    
        icon: 'success',    
        title: 'Log Out feito com sucesso',
        showConfirmButton: false,
        timer: 3000, 
        timerProgressBar: true  
    });
  }
}
