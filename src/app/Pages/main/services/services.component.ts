import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css', './services-responsive.component.css']
})
export class ServicesComponent {
  showAgilityPopUp = false;

  openPopup() {
    this.showAgilityPopUp = true;
  }

  closePopup() {
    this.showAgilityPopUp = false;
  }
}
