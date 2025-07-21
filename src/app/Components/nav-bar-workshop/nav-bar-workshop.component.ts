import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar-workshop',
  templateUrl: './nav-bar-workshop.component.html',
  styleUrls: ['./nav-bar-workshop.component.css', './nav-bar-workshop-responsive.component.css']
})
export class NavBarWorkshopComponent {
  @Output() stepChange = new EventEmitter<number>();
  selectedIndex: number = 0;

  menuItems = [
    { label: 'Projetos', icon: 'fa-solid fa-folder' },
    { label: 'Modulos', icon: 'fa-solid fa-th-large' },
    { label: 'Backend', icon: 'fa-solid fa-database' },
    { label: 'Web', icon: 'fa-solid fa-desktop' },
    { label: 'Mobile', icon: 'fa-solid fa-mobile-screen-button' },
    { label: 'CI/CD', icon: 'fa-solid fa-cloud-arrow-up' },
  ];

  selectItem(index: number) {
    this.selectedIndex = index;
    this.stepChange.emit(index);
  }
}
