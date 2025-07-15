import { Component } from '@angular/core';

@Component({
  selector: 'app-header-workshop',
  templateUrl: './header-workshop.component.html',
  styleUrls: ['./header-workshop.component.css']
})
export class HeaderWorkshopComponent {
  hidden = true;
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
