import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserTokenInterface } from '../interfaces/user.interface';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<UserTokenInterface | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  setUser(data: UserTokenInterface) {
    this.userSubject.next(data);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('userId', JSON.stringify(data.user.id));
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
