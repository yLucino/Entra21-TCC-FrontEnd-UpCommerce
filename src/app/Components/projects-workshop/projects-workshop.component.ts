import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectInterface } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects-workshop',
  templateUrl: './projects-workshop.component.html',
  styleUrls: ['./projects-workshop.component.css']
})
export class ProjectsWorkshopComponent implements OnInit {
  @Output() openProject = new EventEmitter<number>();

  projects: ProjectInterface[] = [];
  projectToDelete!: ProjectInterface | null;

  menuDeleteVisible = false;
  menuAddVisible = false;
  menuAskVisible = false;
  
  userId: number = Number(localStorage.getItem('userId'))
  title: string = '';
  subTitle: string = '';
  description: string = '';
  urlLogo: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
      this.projectService.getAllProjectByUserId(this.userId).subscribe({
        next: (res) => {
          this.projects = res
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

  // Delete, Post
  deleteProject(projectId: number) {
    this.projectService.deleteProject(this.userId, projectId).subscribe({
      next: () => {
        Swal.fire({
            toast: true,            
            position: 'top-end',    
            icon: 'success',    
            title: 'Projeto deletado com sucesso!',
            showConfirmButton: false,
            timer: 3000, 
            timerProgressBar: true  
        });
        this.projectToDelete = null;
        this.menuDeleteVisible = false;
        this.menuAskVisible = false;
        this.ngOnInit();
      },
      error: (err) => {
        Swal.fire({
          toast: true,            
          position: 'top-end',    
          icon: 'error',    
          title: 'Erro ao deletar o projeto!',
          showConfirmButton: false,
          timer: 3000, 
          timerProgressBar: true 
        });
        console.log(err);
      }
    });
  }

  createProject() {
    const data: ProjectInterface = {
      title: this.title,
      subTitle: this.subTitle,
      description: this.description,
      urlLogo: this.urlLogo,
      userId: this.userId,
      component: []
    }

    if (data.title === '') {
      Swal.fire({
        toast: true,            
        position: 'top-end',    
        icon: 'error',    
        title: 'Preencha o formulário para enviar!',
        showConfirmButton: false,
        timer: 3000, 
        timerProgressBar: true 
      });
      return
    }

    this.projectService.postProject(this.userId, data).subscribe({
      next: () => {
        Swal.fire({
            toast: true,            
            position: 'top-end',    
            icon: 'success',    
            title: 'Projeto adicionado com sucesso!',
            showConfirmButton: false,
            timer: 3000, 
            timerProgressBar: true  
        });
        this.menuAddVisible = false;
        this.clearForm();
        this.ngOnInit();
      },
      error: (err) => {
        Swal.fire({
          toast: true,            
          position: 'top-end',    
          icon: 'error',    
          title: 'Erro ao adicionar o projeto!',
          showConfirmButton: false,
          timer: 3000, 
          timerProgressBar: true 
        });
        console.log(err);
      },
    });
  }

  // Functions to project actions
  openProjectToEdit(projectId: number) {
    this.openProject.emit(projectId);
  }

  // Component Visible Management
  toggleMenuDelete() {
    this.menuDeleteVisible = !this.menuDeleteVisible;
  }
  
  toggleMenuAdd() {
    this.menuAddVisible = !this.menuAddVisible;
  }

  toggleMenuAsk() {
    this.menuAskVisible = !this.menuAskVisible;
  }

  openAskActionMenu(project: ProjectInterface) {
    this.projectToDelete = project;
    this.menuAskVisible = true;
    this.menuDeleteVisible = false;
  }
  
  cancelDeleteProject() {
    this.menuAskVisible = false;
    this.projectToDelete = null;
    this.menuDeleteVisible = true;
  }

  clearForm() {
    this.title = '';
    this.subTitle = '';
    this.description = '';
    this.urlLogo = '';
  }
}
