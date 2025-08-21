import { Component } from '@angular/core';
import { ProjectInterface } from 'src/app/interfaces/project.interface';

@Component({
  selector: 'app-projects-workshop',
  templateUrl: './projects-workshop.component.html',
  styleUrls: ['./projects-workshop.component.css']
})
export class ProjectsWorkshopComponent {
  projects: ProjectInterface[] = [];
}
