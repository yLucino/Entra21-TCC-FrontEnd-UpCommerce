import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-workshop',
  templateUrl: './header-workshop.component.html',
  styleUrls: ['./header-workshop.component.css']
})
export class HeaderWorkshopComponent {
  @Input() currentMenu: number = 0;
  hidden = false;
  icon = 'fa-arrow-left';

  toggleHeaderHidden() {
    this.hidden = !this.hidden;
    if (this.hidden === true) {
      this.icon = 'fa-arrow-left';
    } else {
      this.icon = 'fa-arrow-right';
    }
  }
}
