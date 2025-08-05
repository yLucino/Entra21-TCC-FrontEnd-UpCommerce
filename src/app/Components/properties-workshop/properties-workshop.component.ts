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

  @Input() backgroundColor!: string;
  @Input() color!: string;

  // Options for Component Change
  widthOption: string = 'auto';
  heightOption: string = 'auto';
  backgroundColorOption: string = 'custom';

  // Min/Max variables
  maxWidth: number = 179;
  maxHeight: number = 179;

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

        // Propriedades HTML
        const fatherComponent = el.parentElement?.parentElement!;
        const rect = fatherComponent.getBoundingClientRect();
        const styles = window.getComputedStyle(fatherComponent);

        const paddingLeft = parseFloat(styles.paddingLeft);
        const paddingRight = parseFloat(styles.paddingRight);
        const paddingTop = parseFloat(styles.paddingTop);
        const paddingBottom = parseFloat(styles.paddingBottom);

        this.maxWidth = rect.width - paddingLeft - paddingRight;
        this.maxHeight = rect.height - paddingTop - paddingBottom;

        // Propriedades CSS
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
        this.borderColor = this.rgbToHex(getComputedStyle(el).borderColor);
        this.borderType = getComputedStyle(el).borderStyle;

        this.borderRadiusTopLeft = parseInt(getComputedStyle(el).borderTopLeftRadius, 10);
        this.borderRadiusTopRight = parseInt(getComputedStyle(el).borderTopRightRadius, 10);
        this.borderRadiusBottomLeft = parseInt(getComputedStyle(el).borderBottomLeftRadius, 10);
        this.borderRadiusBottomRight = parseInt(getComputedStyle(el).borderBottomRightRadius, 10);

        this.backgroundColor = this.rgbToHex(getComputedStyle(el).backgroundColor);
        this.color = this.rgbToHex(getComputedStyle(el).color);
      }
    });
  }

  updateStyle(property: string, value: any) {
    if (this.selectedElement) {
      this.selectedElement.style[property as any] = value;

      const wrapper = this.selectedElement.parentElement;
      if (property === 'width' || property === 'height') {
        if (wrapper && wrapper.classList.contains('selected-component')) {
          wrapper.style[property as any] = value;
        }
      }
    }
  }

  onOptionChange(type: string) {
    if (type === 'width') {
      const value = this.widthOption !== 'custom' ? this.widthOption : this.width + 'px';
      this.updateStyle('width', value);
    }

    if (type === 'height') {
      const value = this.heightOption !== 'custom' ? this.heightOption : this.height + 'px' ;
      this.updateStyle('height', value);
    }

    if (type === 'background-color') {
      const value = this.backgroundColorOption !== 'custom' ? this.backgroundColorOption : this.backgroundColor;
      this.updateStyle(type, value);
    }
  }

  rgbToHex(rgb: string): string {
    const result = rgb.match(/\d+/g);
    if (!result) return '#000000';
    return (
      '#' +
      result
        .map(x => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }
}

