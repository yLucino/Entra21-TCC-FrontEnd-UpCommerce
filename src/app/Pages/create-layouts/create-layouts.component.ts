import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectHeader } from 'src/app/interfaces/projectHeader.interface';
import { CdkService } from 'src/app/services/cdk.service';

@Component({
  selector: 'app-create-layouts',
  templateUrl: './create-layouts.component.html',
  styleUrls: ['./create-layouts.component.css']
})
export class CreateLayoutsComponent {
  currentStep = 0;
  areaIds: string[] = [];
  projectId!: number;

  projectHeader$: Observable<ProjectHeader>;
  
  constructor(private cdkService: CdkService) {
    this.projectHeader$ = this.cdkService.projectHeader$;
  }

  handleNewAreaId(id: string) {
    if (!this.areaIds.includes(id)) {
      this.areaIds = [...this.areaIds, id];
    }
  }

  openProject(projectId: number) {
    this.projectId = projectId;
    this.currentStep = 3;
  }
}
