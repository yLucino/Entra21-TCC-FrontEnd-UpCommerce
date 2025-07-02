import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-btn-back-to-top',
  templateUrl: './btn-back-to-top.component.html',
  styleUrls: ['./btn-back-to-top.component.css']
})
export class BtnBackToTopComponent {
  scrolled = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled = window.scrollY > 100;
  }
}
