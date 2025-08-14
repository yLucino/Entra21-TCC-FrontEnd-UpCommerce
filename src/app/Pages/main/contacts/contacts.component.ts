import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css', './contacts-responsive.component.css']
})
export class ContactsComponent {
  erroInForm = false;
  successInForm = false;
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  message: string = '';

  sendForm(form: NgForm) {
    if (form.valid) 
    {
      this.successInForm = true;
      this.erroInForm = false;

      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.message = '';
    } else {
      this.erroInForm = true;
      this.successInForm = false;
    }
  }
}
