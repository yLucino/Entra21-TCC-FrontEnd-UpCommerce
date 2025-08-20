import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-workshop',
  templateUrl: './header-workshop.component.html',
  styleUrls: ['./header-workshop.component.css']
})
export class HeaderWorkshopComponent {
  @Input() currentMenu: number = 0;
  hidden = false;
  menuConfig = false;
  icon = 'fa-arrow-right';

  title!: string;
  subTitle!: string;
  description!: string;
  urlLogo!: string;

  toggleHeaderHidden() {
    this.hidden = !this.hidden;
    if (this.hidden === true) {
      this.icon = 'fa-arrow-left';
    } else {
      this.icon = 'fa-arrow-right';
    }
  }

  toggleMenuConfig() {
    this.menuConfig = !this.menuConfig;
  }

  sendForm() {


    this.menuConfig = false;
  }
}
