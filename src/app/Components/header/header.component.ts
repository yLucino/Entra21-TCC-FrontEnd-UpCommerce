import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './header-responsive.component.css']
})
export class HeaderComponent {
  currentComponent: 'login' | 'register' | null = null;
  isMenuOpen = false;

  openLogin() {
    this.currentComponent = 'login';
  }

  openRegister() {
    this.currentComponent = 'register';
  }

  closePopup() {
    this.currentComponent = null;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
