import { Component, OnInit } from '@angular/core';
import { ProjectInterface } from 'src/app/interfaces/project.interface';
import { UserInterface, UserTokenInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: number;
  user!: UserInterface;
  project: ProjectInterface = {
    title: '',
    description: '',
    subTitle: '',
    urlLogo: '',
  };
  visible: boolean = false;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.authService.user$.subscribe((data: UserTokenInterface | null) => {
      if (data) {
        this.userId = data.user.id;
      }
    });

    this.userService.getUserById(this.userId).subscribe((user: UserInterface) => {
      if (user) {
        this.user = user;
      }
    });
  }

  toggleMenuEdit() {
    this.visible = !this.visible;
  }
}
