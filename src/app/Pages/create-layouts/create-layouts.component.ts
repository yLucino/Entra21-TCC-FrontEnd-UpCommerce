import { Component } from '@angular/core';

@Component({
  selector: 'app-create-layouts',
  templateUrl: './create-layouts.component.html',
  styleUrls: ['./create-layouts.component.css']
})
export class CreateLayoutsComponent {
  currentStep = 0;

  areaIds: string[] = [];

  handleNewAreaId(id: string) {
    if (!this.areaIds.includes(id)) {
      this.areaIds = [...this.areaIds, id];
    }
  }
}
