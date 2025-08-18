import { Component } from '@angular/core';
import { ProjectInterface } from 'src/app/interfaces/project.interface';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  data!: UserInterface;
  project!: ProjectInterface;
}
