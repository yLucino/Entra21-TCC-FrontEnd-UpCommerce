import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectHeader } from 'src/app/interfaces/projectHeader.interface';
import { CdkService } from 'src/app/services/cdk.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-layouts',
  templateUrl: './create-layouts.component.html',
  styleUrls: ['./create-layouts.component.css']
})
export class CreateLayoutsComponent {
  currentStep = 0;
  areaIds: string[] = [];
  projectId!: number;
  projectChanged: boolean = false;

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

  onProjectChange(changed: boolean) {
    this.projectChanged = changed;
  }

  async onStepChangeRequest(newStep: number) {
    if (this.projectChanged && newStep != this.currentStep) {
      const result = await Swal.fire({
        title: 'Alterações não salvas',
        text: 'Você tem alterações não salvas. Deseja sair sem salvar? As alterações serão perdidas.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, sair',
        confirmButtonColor: '#C41D1D',
        cancelButtonText: 'Cancelar'
      });

      if (!result.isConfirmed) {
        return;
      } else {
        this.projectChanged = false;
      }
    }

    this.currentStep = newStep;
  }
}
