import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    console.log(token);
    return true;
  } else {
    router.navigate(['/']);
    Swal.fire({
      toast: true,            
      position: 'top-end',    
      icon: 'warning',    
      title: 'Faça login para acessar!',
      showConfirmButton: false,
      timer: 3000, 
      timerProgressBar: true 
    });
    return false;
  }
};
