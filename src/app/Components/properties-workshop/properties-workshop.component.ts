import { Component, Input } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties-workshop',
  templateUrl: './properties-workshop.component.html',
  styleUrls: ['./properties-workshop.component.css']
})
export class PropertiesWorkshopComponent {
  // Inputs for the component
  @Input() title!: string;
  @Input() icon!: string;
  @Input() textPreviewComponent!: string;

  @Input() visibility!: boolean;
  @Input() width!: number;
  @Input() height!: number;

  @Input() marginLeft!: number;
  @Input() marginTop!: number;
  @Input() marginRight!: number;
  @Input() marginBottom!: number;

  @Input() paddingLeft!: number;
  @Input() paddingTop!: number;
  @Input() paddingRight!: number;
  @Input() paddingBottom!: number;

  @Input() borderSize!: number;
  @Input() borderColor!: string;
  @Input() borderType!: string;

  @Input() borderRadiusTopLeft!: number;
  @Input() borderRadiusTopRight!: number;
  @Input() borderRadiusBottomLeft!: number;
  @Input() borderRadiusBottomRight!: number;

  // Options for Component Change
  widthOption: string = 'auto';
  heightOption: string = 'auto';


  // Code 
  selectedElement: HTMLElement | null = null;

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

        this.marginLeft = parseInt(getComputedStyle(el).marginLeft, 10);
        this.marginTop = parseInt(getComputedStyle(el).marginTop, 10);
        this.marginRight = parseInt(getComputedStyle(el).marginRight, 10);
        this.marginBottom = parseInt(getComputedStyle(el).marginBottom, 10);

        this.paddingLeft = parseInt(getComputedStyle(el).paddingLeft, 10);
        this.paddingTop = parseInt(getComputedStyle(el).paddingTop, 10);
        this.paddingRight = parseInt(getComputedStyle(el).paddingRight, 10);
        this.paddingBottom = parseInt(getComputedStyle(el).paddingBottom, 10);

        this.borderSize = parseInt(getComputedStyle(el).borderWidth, 10);
        this.borderColor = getComputedStyle(el).borderColor;
        this.borderType = getComputedStyle(el).borderStyle;

        this.borderRadiusTopLeft = parseInt(getComputedStyle(el).borderTopLeftRadius, 10);
        this.borderRadiusTopRight = parseInt(getComputedStyle(el).borderTopRightRadius, 10);
        this.borderRadiusBottomLeft = parseInt(getComputedStyle(el).borderBottomLeftRadius, 10);
        this.borderRadiusBottomRight = parseInt(getComputedStyle(el).borderBottomRightRadius, 10);
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

