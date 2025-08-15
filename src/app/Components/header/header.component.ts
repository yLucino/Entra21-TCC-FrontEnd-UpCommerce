import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/interfaces/loginResponse.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './header-responsive.component.css']
})
export class HeaderComponent implements OnInit {
  currentComponent: 'login' | 'register' | null = null;
  isMenuOpen = false;
  isMenuLoginOpen = false;
  token!: string | null;
  username!: string | null;
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe((data: LoginResponse | null) => {
      if (data) {
        this.username = data.user.name.split(' ')[0];
        this.token = data.token;
      } else {
        this.username = null;
        this.token = null;
      }
    });
  }

  openLogin() {
    this.currentComponent = 'login';
  }

  openRegister() {
    this.currentComponent = 'register';
  }

  logout() {
    setTimeout(() => {
      this.authService.clearUser();
    }, 500);
  }

  openMenu() {
    this.isMenuLoginOpen = !this.isMenuLoginOpen;
  }

  closePopup() {
    this.currentComponent = null;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
