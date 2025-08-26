import { Component, OnInit } from '@angular/core';
import { ProjectInterface } from 'src/app/interfaces/project.interface';
import { UserInterface, UserTokenInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = Number(localStorage.getItem('userId'));
  user!: UserInterface;
  projects: ProjectInterface[] = [];
  visible: boolean = false;

  constructor(private userService: UserService, private projectService: ProjectService) {}

  ngOnInit() {
    this.userService.getUserById(this.userId).subscribe((user: UserInterface) => {
      if (user) {
        this.user = user;
      }
    });

    this.projectService.getAllProjectByUserId(this.userId).subscribe({
      next: (res) => {
        this.projects = res;
      },
      error: (err) => {
        Swal.fire({
          toast: true,            
          position: 'top-end',    
          icon: 'error',    
          title: 'Erro ao carregar os projetos!',
          showConfirmButton: false,
          timer: 3000, 
          timerProgressBar: true
        });
        console.log(err);
      }
    });
  }

  toggleMenuEdit() {
    this.visible = !this.visible;
  }
}
