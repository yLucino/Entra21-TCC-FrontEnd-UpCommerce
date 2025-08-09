import { Component, Input } from '@angular/core';
import { ComponentDragDrop } from 'src/app/interfaces/component.dragdrop.interface';
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
  @Input() id!: string;

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

  @Input() fontFamily!: string;
  @Input() textContent!: string;
  @Input() fontSize!: number;
  @Input() fontWeight!: string;
  @Input() textAlign!: string;

  @Input() opacity!: number;

  @Input() shadowX: number = 0;
  @Input() shadowY: number = 0;
  @Input() shadowBlur: number  = 0;
  @Input() shadowColor: string = '#000000';

  @Input() position!: string;
  @Input() top!: number;
  @Input() left!: number;
  @Input() right!: number;
  @Input() bottom!: number;

  @Input() zIndex!: number;

  @Input() hoverScale!: string;
  @Input() hoverBorderRadius!: number;
  @Input() hoverShadowX: number = 0;
  @Input() hoverShadowY: number = 0;
  @Input() hoverShadowBlur: number  = 0;
  @Input() hoverShadowColor: string = '#000000';

  @Input() cursor!: string;

  @Input() display!: string;
  @Input() flexDirection!: string;
  @Input() flexJustify!: string;
  @Input() flexAlign!: string;
  @Input() flexWrap!: string;
  @Input() flexGap!: number;
  @Input() flexAlignItems!: string;
  @Input() alignSelf!: string;

  @Input() newComponentId: string = '';

  @Input() imageSource: string = '';

  // Options for Component Change
  widthOption: string = 'auto';
  heightOption: string = 'auto';
  backgroundColorOption: string = 'custom';
  boxShadowOption: string = 'none';
  topOption: string = 'auto';
  leftOption: string = 'auto';
  rightOption: string = 'auto';
  bottomOption: string = 'auto';
  animationOption: string = 'none';
  hoverBackgroundColorOption: string = 'custom';
  hoverBoxShadowOption: string = 'none';

  // Min/Max variables
  maxWidth: number = 179;
  maxHeight: number = 179;

  // Code 
  selectedElement: HTMLElement | null = null;
  fatherComponent: HTMLElement | null = null;
  displayWindow: string = 'properties';
  components: ComponentDragDrop[] = [];
  askDeleteComponent = false;
  askRanameComponent = false;
  componentToDelete: HTMLElement | null = null;
  componentToRename: HTMLElement | null = null;
  nameTag: string | null = '';
  searchTerm: string = '';

  private mutationObserver!: MutationObserver;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService.getSelectedElement().subscribe(el => {
      if (el) {
        this.selectComponent(el); 
      }
    });
  }

  updateStyle(property: string, value: any) {
    if (this.selectedElement) {
      if (property === 'font-size' && typeof value === 'number') {
        value = `${value}px`;
      }
      
      this.selectedElement.style[property as any] = value;

      const wrapper = this.selectedElement.parentElement;
      if (property === 'width' || property === 'height') {
        if (wrapper && wrapper.classList.contains('selected-component')) {
          wrapper.style[property as any] = value;
        }
      }
    }
  }

  updateText(text: string) {
    if (this.selectedElement) {
      this.selectedElement.textContent = text;
    }
  }
  
  updateUrlImage(url: string) {
    if (this.selectedElement) {
      this.selectedElement.setAttribute('src', url);
    }
  }

  updateHoverStyle(property: string, value: string) {
    if (!this.selectedElement) return;

    const hoverClass = `hover-style-${this.selectedElement.id}`;
    this.selectedElement.classList.add(hoverClass);

    let styleEl = document.getElementById('dynamic-hover-style') as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-hover-style';
      document.head.appendChild(styleEl);
    }

    const sheet = styleEl.sheet as CSSStyleSheet;
    const selector = `.${hoverClass}:hover`;
    let ruleIndex = -1;
    let existingStyles: Record<string, string> = {};

    // Busca a regra já existente no CSS
    for (let i = 0; i < sheet.cssRules.length; i++) {
      const rule = sheet.cssRules[i] as CSSStyleRule;
      if (rule.selectorText === selector) {
        ruleIndex = i;

        // Coleta propriedades existentes corretamente (mesmo com !important)
        const declarations = rule.style;
        for (let j = 0; j < declarations.length; j++) {
          const prop = declarations[j];
          const val = declarations.getPropertyValue(prop).trim();
          existingStyles[prop] = val.replace('!important', '').trim();
        }

        break;
      }
    }

    // Atualiza/insere a nova propriedade com !important
    existingStyles[property] = value;

    const newStyleText = Object.entries(existingStyles)
      .map(([k, v]) => `${k}: ${v} !important`)
      .join('; ');

    // Atualiza regra
    if (ruleIndex >= 0) {
      sheet.deleteRule(ruleIndex);
    }

    sheet.insertRule(`${selector} { ${newStyleText}; }`, sheet.cssRules.length);
  }

  updateBoxShadow(type: string, shadowX: number, shadowY: number, shadowBlur: number, shadowColor: string) {
    if (this.selectedElement) {
      if (type === 'css') {
        this.shadowX = shadowX;
        this.shadowY = shadowY;
        this.shadowBlur = shadowBlur;
        this.shadowColor = shadowColor;
  
        const boxShadow = `${this.shadowX}px ${this.shadowY}px ${this.shadowBlur}px ${this.shadowColor}`;
        this.selectedElement.style.boxShadow = boxShadow;
      } else if (type === 'hover') {
        this.hoverShadowX = shadowX;
        this.hoverShadowY = shadowY;
        this.hoverShadowBlur = shadowBlur;
        this.hoverShadowColor = shadowColor;

        const boxShadow = `${this.shadowX}px ${this.shadowY}px ${this.shadowBlur}px ${this.shadowColor}`;
        this.updateHoverStyle('box-shadow', boxShadow);
      } else if (type === 'hoverSelect') {

        const boxShadow = shadowColor;
        this.updateHoverStyle('box-shadow', boxShadow);
      }
    }
  }

  onOptionChange(type: string) {
    let value: any;

    switch (type) {
      case 'width':
        value = this.widthOption !== 'custom' ? this.widthOption : this.width + 'px';
        this.updateStyle('width', value);
        break;

      case 'height':
        value = this.heightOption !== 'custom' ? this.heightOption : this.height + 'px';
        this.updateStyle('height', value);
        break;

      case 'background-color':
        value = this.backgroundColorOption !== 'custom' ? this.backgroundColorOption : this.backgroundColor;
        this.updateStyle('background-color', value);
        break;
      
      case 'box-shadow':
        if (this.boxShadowOption !== 'custom') {
          this.updateStyle('box-shadow', this.boxShadowOption);
        } else {
          this.updateBoxShadow('css', this.shadowX, this.shadowY, this.shadowBlur, this.shadowColor);
        }
        break;
      
      case 'hover-box-shadow':
        if (this.hoverBoxShadowOption !== 'custom') {
          this.updateBoxShadow('hoverSelect', 0, 0, 0, this.hoverBoxShadowOption);
        } else {
          this.updateBoxShadow('hover', this.hoverShadowX, this.hoverShadowY, this.hoverShadowBlur, this.hoverShadowColor);
        }
        break;

      case 'top':
        value = this.topOption !== 'custom' ? this.topOption : this.top;
        this.updateStyle('top', value);
        break;

      case 'left':
        value = this.leftOption !== 'custom' ? this.leftOption : this.left;
        this.updateStyle('left', value);
        break;

      case 'right':
        value = this.rightOption !== 'custom' ? this.rightOption : this.right;
        this.updateStyle('right', value);
        break;

      case 'bottom':
        value = this.bottomOption !== 'custom' ? this.bottomOption : this.bottom;
        this.updateStyle('bottom', value);
        break;
      
      default:
        console.warn(`Unhandled option type: ${type}`);
        break;
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

  resetProperties() {
    this.title = '';
    this.icon = '';
    this.textPreviewComponent = '';

    this.width = 0;
    this.height = 0;

    this.marginLeft = 0;
    this.marginTop = 0;
    this.marginRight = 0;
    this.marginBottom = 0;

    this.paddingLeft = 0;
    this.paddingTop = 0;
    this.paddingRight = 0;
    this.paddingBottom = 0;

    this.borderSize = 0;
    this.borderColor = '#000000';
    this.borderType = 'solid';

    this.borderRadiusTopLeft = 0;
    this.borderRadiusTopRight = 0;
    this.borderRadiusBottomLeft = 0;
    this.borderRadiusBottomRight = 0;

    this.backgroundColor = '#FFFFFF';
    this.color = '#000000';

    this.fontFamily = 'Arial, sans-serif';
    this.textContent = '';
    this.fontSize = 16;
    this.fontWeight = '400';
    this.textAlign = 'left';

    this.opacity = 1;

    this.shadowX = 0;
    this.shadowY = 0;
    this.shadowBlur = 0;
    this.shadowColor = '#000000';

    this.position = 'static';
    this.top = 0;
    this.left = 0;
    this.right = 0;
    this.bottom = 0;

    this.zIndex = 1;

    this.hoverScale = '1';
    this.hoverBorderRadius = 0;
    this.hoverShadowX = 0;
    this.hoverShadowY = 0;
    this.hoverShadowBlur = 0;
    this.hoverShadowColor = '#000000';

    // Options
    this.widthOption = 'auto';
    this.heightOption = 'auto';
    this.backgroundColorOption = 'custom';
    this.boxShadowOption = 'none';
    this.topOption = 'auto';
    this.leftOption = 'auto';
    this.rightOption = 'auto';
    this.bottomOption = 'auto';
    this.animationOption = 'none';
    this.hoverBackgroundColorOption = 'custom';
    this.hoverBoxShadowOption = 'none';
    this.cursor = 'auto';

    // Limites
    this.maxWidth = 179;
    this.maxHeight = 179;

    this.display = 'block';
    this.flexDirection = 'row';
    this.flexJustify = 'flex-start';
    this.flexAlign = 'flex-start';
    this.flexWrap = 'nowrap';
    this.flexGap = 0;
    this.flexAlignItems = 'flex-start';
    this.alignSelf = 'auto';
  }

  loadStylesFromElement(el: HTMLElement) {
    const computed = getComputedStyle(el);

    // Dimensões e box model
    this.width = el.offsetWidth;
    this.height = el.offsetHeight;

    this.marginLeft = parseInt(computed.marginLeft, 10);
    this.marginTop = parseInt(computed.marginTop, 10);
    this.marginRight = parseInt(computed.marginRight, 10);
    this.marginBottom = parseInt(computed.marginBottom, 10);

    this.paddingLeft = parseInt(computed.paddingLeft, 10);
    this.paddingTop = parseInt(computed.paddingTop, 10);
    this.paddingRight = parseInt(computed.paddingRight, 10);
    this.paddingBottom = parseInt(computed.paddingBottom, 10);

    // Borda
    this.borderSize = parseInt(computed.borderWidth, 10);
    this.borderType = computed.borderStyle;

    this.borderRadiusTopLeft = parseInt(computed.borderTopLeftRadius, 10);
    this.borderRadiusTopRight = parseInt(computed.borderTopRightRadius, 10);
    this.borderRadiusBottomLeft = parseInt(computed.borderBottomLeftRadius, 10);
    this.borderRadiusBottomRight = parseInt(computed.borderBottomRightRadius, 10);

    // Cores e fonte
    this.fontFamily = computed.fontFamily;
    this.textContent = el.textContent || '';
    this.fontSize = parseInt(computed.fontSize, 10);
    this.fontWeight = computed.fontWeight;
    this.textAlign = computed.textAlign;
    this.opacity = parseFloat(computed.opacity);

    // Posição
    this.position = computed.position;
    this.topOption = computed.top !== 'auto' ? 'custom' : 'auto';
    this.leftOption = computed.left !== 'auto' ? 'custom' : 'auto';
    this.rightOption = computed.right !== 'auto' ? 'custom' : 'auto';
    this.bottomOption = computed.bottom !== 'auto' ? 'custom' : 'auto';

    this.top = computed.top !== 'auto' ? parseInt(computed.top, 10) : 0;
    this.left = computed.left !== 'auto' ? parseInt(computed.left, 10) : 0;
    this.right = computed.right !== 'auto' ? parseInt(computed.right, 10) : 0;
    this.bottom = computed.bottom !== 'auto' ? parseInt(computed.bottom, 10) : 0;

    this.zIndex = parseInt(computed.zIndex, 10);

    // Cursor
    this.cursor = computed.cursor;

    this.color = this.rgbToHex(computed.color);
    this.backgroundColor = this.rgbToHex(computed.backgroundColor);
    this.borderColor = this.rgbToHex(computed.borderColor);

    this.display = computed.display;
    this.flexDirection = computed.flexDirection;
    this.flexJustify = computed.justifyContent;
    this.flexAlign = computed.alignContent;
    this.flexWrap = computed.flexWrap;
    this.flexGap = parseInt(computed.gap, 10);
    this.flexAlignItems = computed.alignItems
    this.alignSelf = computed.alignSelf;

    // Image
    this.imageSource = el.getAttribute('src') || '';
  }

  // Explorer Logic
  selectComponent(component: HTMLElement) {
    this.deselectElement();
    this.selectedElement = component;
    this.selectedElement.classList.add('selected-component');
    this.resetProperties();

    const nameTag = component.getAttribute('ng-reflect-name-tag');
    this.nameTag = nameTag;

    const foundInComponents = this.propertyService.components.find(c => c.nameTag === nameTag);
    const foundInScreens = this.propertyService.screens.find(s => s.nameTag === nameTag);
    const found = foundInComponents || foundInScreens;

    if (found) {
      this.title = found.text;
      this.icon = found.icon;
      this.textPreviewComponent = found.description;
      this.id = component.id;
    }

    // Propriedades HTML
    this.fatherComponent = component.parentElement?.parentElement!;
    const rect = this.fatherComponent.getBoundingClientRect();
    const styles = window.getComputedStyle(this.fatherComponent);

    const paddingLeft = parseFloat(styles.paddingLeft);
    const paddingRight = parseFloat(styles.paddingRight);
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat(styles.paddingBottom);

    this.maxWidth = rect.width - paddingLeft - paddingRight;
    this.maxHeight = rect.height - paddingTop - paddingBottom;

    // Propriedades CSS
    this.loadStylesFromElement(component);
  }

  actionComponent(component: HTMLElement, action: string) {
    if (action === 'delete') {
      this.askDeleteComponent = true;
      this.componentToDelete = component;
    } else if (action === 'rename') {
      this.askRanameComponent = true;
      this.componentToRename = component;
    }
  }

  confirmDelete() {
    if (this.componentToDelete?.parentElement) {
      this.componentToDelete.parentElement.remove();
      this.deselectElement();
      this.propertyService.setSelectedElement(null);
    }

    this.closeDeleteDialog();
  }
  
  confirmRename() {
    if (this.componentToRename?.parentElement && this.newComponentId !== '') {
      this.componentToRename.id = this.newComponentId;
      this.id = this.newComponentId;
    }

    this.closeDeleteDialog();
  }

  cancel() {
    this.closeDeleteDialog();
  }

  private closeDeleteDialog() {
    this.askDeleteComponent = false;
    this.componentToDelete = null;
    this.askRanameComponent = false;
    this.componentToRename = null;
    this.newComponentId = '';
  }
  
  deselectElement() {
    this.selectedElement?.classList.remove('selected-component');
    this.selectedElement = null;
    this.fatherComponent = null;
    this.resetProperties();
  }

  ngAfterViewInit() {
    const smartphoneCDK = document.getElementById('smartphoneList');

    if (smartphoneCDK) {
      this.observeComponentChanges(smartphoneCDK);
      this.renderComponents(); 
    }
  }

  observeComponentChanges(container: HTMLElement) {
    this.mutationObserver = new MutationObserver(() => {
      this.renderComponents();
    });

    this.mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });
  }

  renderComponents() {
    const smartphoneCDK = document.getElementById('smartphoneList');
    if (!smartphoneCDK) return;

    const elements = Array.from(
      smartphoneCDK.querySelectorAll('.component, .screen')
    ) as HTMLElement[];

    this.components = [];

    elements.forEach(element => {
      const nameTag = element.getAttribute('ng-reflect-name-tag');
      const foundInComponents = this.propertyService.components.find(c => c.nameTag === nameTag);
      const foundInScreens = this.propertyService.screens.find(s => s.nameTag === nameTag);
      const found = foundInComponents || foundInScreens;

      if (found) {
        this.components.push({
          text: found.text,
          icon: found.icon,
          nameTag: nameTag || '',
          description: found.description,
          component: element
        });
      }
    });
  }

  toggleWindow(window: string) {
    this.displayWindow = window;
  }

  // Search functionality to Explorer
  get filteredComponents(): ComponentDragDrop[] {
    return this.components.filter(el => {
      const search = this.normalize(this.searchTerm);

      const idMatch = el.component?.id 
        ? this.normalize(el.component.id).includes(search) 
        : false;

      const textMatch = el.text 
        ? this.normalize(el.text).includes(search) 
        : false;
      
      const tagMatch = el.nameTag 
        ? this.normalize(el.nameTag).includes(search) 
        : false;

      return idMatch || tagMatch || textMatch;
    });
  }

  normalize(text: string): string {
    return text
      ? text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      : '';
  }
}