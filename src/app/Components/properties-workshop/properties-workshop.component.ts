import { Component, Input } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties-workshop',
  templateUrl: './properties-workshop.component.html',
  styleUrls: ['./properties-workshop.component.css']
})
export class PropertiesWorkshopComponent {
  @Input() title!: string;
  @Input() icon!: string;
  @Input() textPreviewComponent!: string;

  @Input() visibility!: boolean;
  @Input() width!: number;
  @Input() height!: number;

  widthOption: string = 'auto';
  heightOption: string = 'auto';

  selectedElement: HTMLElement | null = null;
  private lastSelectedElement: HTMLElement | null = null;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService.getSelectedElement().subscribe(el => {
      if (el) {
        this.selectedElement = el;

        const nameTag = el.getAttribute('ng-reflect-name-tag');
        const foundInComponents = this.propertyService.components.find(c => c.nameTag === nameTag);
        const foundInScreens = this.propertyService.screens.find(s => s.nameTag === nameTag);
        const found = foundInComponents || foundInScreens;

        if (found) {
          this.title = found.text;
          this.icon = found.icon;
          this.textPreviewComponent = found.description;
        }

        // Propriedades CSS
        this.visibility = el.style.visibility !== 'hidden';
        this.width = el.offsetWidth;
        this.height = el.offsetHeight;
      }
    });
  }

  updateStyle(property: string, value: any) {
    if (this.selectedElement) {
      this.selectedElement.style[property as any] = value;
    }
  }

  onOptionChange(type: string) {
    if (this.widthOption === 'custom') {
      this.updateStyle(type, this.width + 'px');
    } else {
      this.updateStyle(type, this.widthOption);
    }

    if (this.heightOption === 'custom') {
      this.updateStyle(type, this.height + 'px');
    } else {
      this.updateStyle(type, this.heightOption);
    }
  }
}

