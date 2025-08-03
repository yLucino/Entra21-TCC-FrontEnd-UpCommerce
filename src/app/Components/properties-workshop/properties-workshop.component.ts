import { Component } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties-workshop',
  templateUrl: './properties-workshop.component.html',
  styleUrls: ['./properties-workshop.component.css']
})
export class PropertiesWorkshopComponent {
  selectedElement: HTMLElement | null = null;
  private lastSelectedElement: HTMLElement | null = null;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService.getSelectedElement().subscribe(el => {
      if (el) {
        if (this.lastSelectedElement) {
          this.lastSelectedElement.classList.remove('selected-component');
        }

        el.classList.add('selected-component');

        this.lastSelectedElement = el;
        this.selectedElement = el;

        console.log(`Elemento selecionado: ${el.tagName}`, el);
      }
    });
  }
}

