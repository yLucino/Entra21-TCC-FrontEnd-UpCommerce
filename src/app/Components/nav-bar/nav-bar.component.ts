import { Component } from '@angular/core';
import { UserTokenInterface } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  userId: number = Number(localStorage.getItem('userId'));
  urlPhoto!: string;
  username!: string;
  email!: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserById(this.userId).subscribe({
      next: (res) => {
        this.urlPhoto = res.urlPhoto || 'https://placehold.co/100';
        this.username = res.name || 'Username';
        this.email = res.email || 'examplegmail';
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
