import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ButtonSetScreen } from '../interfaces/buttonSetScreen.interface';
import { CdkComponent } from '../interfaces/cdkComponent.interface';
import { ProjectInterface } from '../interfaces/project.interface';
import { ComponentStyles } from '../interfaces/componentSyles.interface';
import { AreaComponent } from '../dragAndDrop/component/area/area.component';
import { ButtonComponent } from '../dragAndDrop/component/button/button.component';
import { TextComponent } from '../dragAndDrop/component/text/text.component';
import { ImageComponent } from '../dragAndDrop/component/image/image.component';
import { InputComponent } from '../dragAndDrop/component/input/input.component';
import { IconComponent } from '../dragAndDrop/component/icon/icon.component';
import { LinkComponent } from '../dragAndDrop/component/link/link.component';
import { ProjectHeader } from '../interfaces/projectHeader.interface';
import { ProjectService } from './project.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class CdkService {
  private buttonsSource = new BehaviorSubject<ButtonSetScreen | null>(null);
  private screenSource = new BehaviorSubject<ButtonSetScreen | null>(null);

  dropZonesIds = [
    "homeList",
    "paymentList",
    "perfilList",
    "configList",
    "notifyList",
    "messageList",
    "helpList",
    "favList",
    "cartList",
    "historyList",
    "reportsList",
    "loginList",
  ];

  constructor(private projectService: ProjectService) {}

  buttons$ = this.buttonsSource.asObservable();
  screenId$ = this.screenSource.asObservable();
  userId: number = Number(localStorage.getItem('userId'));
  
  private dropHostMap = new Map<string, ViewContainerRef>();
  private viewContainerRef!: ViewContainerRef;
  private projectHeaderSource = new BehaviorSubject<ProjectHeader>({
    title: '',
    subTitle: '',
    description: '',
    urlLogo: ''
  });

  projectHeader$ = this.projectHeaderSource.asObservable();

  setDropHostMap(map: Map<string, ViewContainerRef>) {
    this.dropHostMap = map;
  }

  // Project
  updateProjectHeader(header: ProjectHeader) {
    this.projectHeaderSource.next(header);
  }

  getProjectHeader(): ProjectHeader {
    return this.projectHeaderSource.getValue();
  }

  setViewContainerRef(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }

  addButton(button: ButtonSetScreen) {
    this.buttonsSource.next(button);
  }
  
  transferScreen(btn: ButtonSetScreen) {
    this.screenSource.next(btn);
  }

  // Salvar CDK em JSON
  serializeComponent(element: HTMLElement): CdkComponent {
    const computed = window.getComputedStyle(element);
    const id = element.id;
    const cdkId = element.id;
    let parentCdkId = element.parentElement?.parentElement?.getAttribute('id') || null;

    const style: ComponentStyles = {
      width: parseInt(computed.width) || 0,
      height: parseInt(computed.height) || 0,
      marginLeft: parseInt(computed.marginLeft) || 0,
      marginTop: parseInt(computed.marginTop) || 0,
      marginRight: parseInt(computed.marginRight) || 0,
      marginBottom: parseInt(computed.marginBottom) || 0,
      paddingLeft: parseInt(computed.paddingLeft) || 0,
      paddingTop: parseInt(computed.paddingTop) || 0,
      paddingRight: parseInt(computed.paddingRight) || 0,
      paddingBottom: parseInt(computed.paddingBottom) || 0,
      borderSize: parseInt(computed.borderWidth) || 0,
      borderColor: computed.borderColor || '',
      borderType: computed.borderStyle || '',
      borderRadiusTopLeft: parseInt(computed.borderTopLeftRadius) || 0,
      borderRadiusTopRight: parseInt(computed.borderTopRightRadius) || 0,
      borderRadiusBottomLeft: parseInt(computed.borderBottomLeftRadius) || 0,
      borderRadiusBottomRight: parseInt(computed.borderBottomRightRadius) || 0,
      backgroundColor: computed.backgroundColor || '',
      color: computed.color || '',
      fontFamily: computed.fontFamily || '',
      textContent: element.textContent?.trim() || '',
      fontSize: parseInt(computed.fontSize) || 0,
      fontWeight: computed.fontWeight || '',
      textAlign: computed.textAlign || '',
      opacity: parseFloat(computed.opacity) || 1,
      shadowX: 0, 
      shadowY: 0, 
      shadowBlur: 0, 
      shadowColor: "#000000",
      position: computed.position || '',
      top: parseInt(computed.top) || 0,
      left: parseInt(computed.left) || 0,
      right: parseInt(computed.right) || 0,
      bottom: parseInt(computed.bottom) || 0,
      zIndex: parseInt(computed.zIndex) || 0,
      hoverScale: "",
      hoverBorderRadius: 0,
      hoverShadowX: 0,
      hoverShadowY: 0,
      hoverShadowBlur: 0,
      hoverShadowColor: "#000000",
      cursor: computed.cursor || '',
      display: computed.display || '',
      flexDirection: computed.flexDirection || '',
      flexJustify: computed.justifyContent || '',
      flexAlign: computed.alignContent || '',
      flexWrap: computed.flexWrap || '',
      flexGap: parseInt((computed as any).gap) || 0,
      flexAlignItems: computed.alignItems || '',
      alignSelf: computed.alignSelf || '',
      newComponentId: element.id || '',
      imageSource: element.getAttribute("src") || '',
      iconSource: (element.getAttribute("class") || '').split(' ').filter(c => c !== 'selected-component').join(' '),
      linkSource: element.getAttribute("href") || ''
    };


    const children: CdkComponent[] = Array.from(element.children)
      .filter(c => c instanceof HTMLElement)
      .map(c => this.serializeComponent(c as HTMLElement))
      .filter(c => c.id || c.cdkId || c.style);

    return {
      id: id,
      cdkId: cdkId,
      parentCdkId: parentCdkId,
      style: style,
      children: children
    };
  }

  saveProject(): void {
    const rootComponents: CdkComponent[] = [];

    this.dropZonesIds.forEach(dropId => {
      const dropEl = document.getElementById(dropId);
      if (!dropEl) return;

      Array.from(dropEl.children)
        .filter(c => c instanceof HTMLElement)
        .forEach(child => {
          const component = this.getComponentRecursive(child as HTMLElement);
          if (!component) return;

          rootComponents.push(component);
        });
    });

    const header = this.getProjectHeader();

    const projeto: ProjectInterface = {
      urlLogo: header.urlLogo || "URL da Logo do Projeto",
      title: header.title || "Nome do Projeto",
      subTitle: header.subTitle || "Slogan do Projeto",
      description: header.description || "Descrição do Projeto",
      userId: this.userId,
      component: rootComponents.length ? rootComponents : []
    };

    if (header.id) {
      this.projectService.putProject(this.userId, header.id, projeto).subscribe({
        next: () => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Projeto salvo com sucesso!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        },
        error: (err) => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Erro ao salvar o projeto!',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          console.log(err);
        }
      });
    }
  }

  getComponentRecursive(element: HTMLElement): CdkComponent | null {
    const componentEl = element.classList.contains('component')
      ? element
      : Array.from(element.children).find(c => (c as HTMLElement).classList.contains('component')) as HTMLElement | undefined;

    if (!componentEl) return null;

    const component = this.serializeComponent(componentEl);

    const childComponents: CdkComponent[] = Array.from(componentEl.children)
      .map(c => this.getComponentRecursive(c as HTMLElement))
      .filter(c => c !== null) as CdkComponent[];

    if (childComponents.length > 0) {
      component.children = childComponents;
    } 

    return component;
  }

  // Rendenizar Json Para CDK
  deserializeComponent(compData: any, container: ViewContainerRef): void {
    const compClass = this.getComponentClass(compData.cdkId);
    if (!compClass) return;

    const componentRef = container.createComponent<any>(compClass);

    if ('backendId' in componentRef.instance) {
      componentRef.instance.backendId = compData.id;
    }

    setTimeout(() => {
      const instance = componentRef.instance as any;
      const el = componentRef.location.nativeElement as HTMLElement;

      this.applyStylesToElement(compData, el, compData.style || {});

      if (instance instanceof AreaComponent) {
        const areaInstance = instance as AreaComponent;
        areaInstance.areaListId = compData.id;
        areaInstance.childrenData = compData.children || [];
        if (areaInstance.viewContainerRef) {
          (compData.children || []).forEach((child: any) => {
            this.deserializeComponent(child, areaInstance.viewContainerRef);
          });
        }
      }
    });
  }

  deserializeProject(project: ProjectInterface): void {
    this.dropHostMap.forEach(container => container.clear());

    if (!project.component) return;

    project.component.forEach(comp => {
      const parentCdkId = comp.parentCdkId;
      if (parentCdkId) {
        const parentCDK = this.dropHostMap.get(parentCdkId);

        if (parentCDK) {
          
          this.deserializeComponent(comp, parentCDK);
        }
      }
    });
  }

  parseValue(value: any): any {
    if (!isNaN(value) && value !== "") return Number(value);
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  }

  getComponentClass(cdkId: string): any {
    if (!cdkId) return null;

    switch(cdkId.split('-')[0].toLowerCase()) {
      case "areacomponent": return AreaComponent;
      case "buttoncomponent": return ButtonComponent;
      case "textcomponent": return TextComponent;
      case "imagecomponent": return ImageComponent;
      case "inputcomponent": return InputComponent;
      case "iconcomponent": return IconComponent;
      case "linkcomponent": return LinkComponent;
    }
  }

  applyStylesToElement(compData: any, el: HTMLElement, styles: ComponentStyles) {
    if (!styles || !el) return;
    const wrapper = el.querySelector('.area-style-wrapper') as HTMLElement;

    const elId = compData.id;

    if (!elId) return;
    
    let cssRule = `#${elId} {`;

    // Dimensões
    if (styles.width !== undefined) cssRule += `width:${styles.width}px;`;
    if (styles.height !== undefined) cssRule += `height:${styles.height}px;`;

    // Margens
    if (styles.marginLeft !== undefined) cssRule += `margin-left:${styles.marginLeft}px;`;
    if (styles.marginTop !== undefined) cssRule += `margin-top:${styles.marginTop}px;`;
    if (styles.marginRight !== undefined) cssRule += `margin-right:${styles.marginRight}px;`;
    if (styles.marginBottom !== undefined) cssRule += `margin-bottom:${styles.marginBottom}px;`;

    // Padding
    if (styles.paddingLeft !== undefined) cssRule += `padding-left:${styles.paddingLeft}px;`;
    if (styles.paddingTop !== undefined) cssRule += `padding-top:${styles.paddingTop}px;`;
    if (styles.paddingRight !== undefined) cssRule += `padding-right:${styles.paddingRight}px;`;
    if (styles.paddingBottom !== undefined) cssRule += `padding-bottom:${styles.paddingBottom}px;`;

    // Bordas
    if (styles.borderSize !== undefined) cssRule += `border-width:${styles.borderSize}px;`;
    if (styles.borderColor) cssRule += `border-color:${styles.borderColor};`;
    if (styles.borderType) cssRule += `border-style:${styles.borderType};`;
    if (styles.borderRadiusTopLeft !== undefined) cssRule += `border-top-left-radius:${styles.borderRadiusTopLeft}px;`;
    if (styles.borderRadiusTopRight !== undefined) cssRule += `border-top-right-radius:${styles.borderRadiusTopRight}px;`;
    if (styles.borderRadiusBottomLeft !== undefined) cssRule += `border-bottom-left-radius:${styles.borderRadiusBottomLeft}px;`;
    if (styles.borderRadiusBottomRight !== undefined) cssRule += `border-bottom-right-radius:${styles.borderRadiusBottomRight}px;`;

    // Cores e fonte
    if (styles.backgroundColor) cssRule += `background-color:${styles.backgroundColor};`;
    if (styles.color) cssRule += `color:${styles.color};`;
    if (styles.fontFamily) cssRule += `font-family:${styles.fontFamily};`;
    if (styles.fontSize !== undefined) cssRule += `font-size:${styles.fontSize}px;`;
    if (styles.fontWeight) cssRule += `font-weight:${styles.fontWeight};`;
    if (styles.textAlign) cssRule += `text-align:${styles.textAlign};`;

    // Outros
    if (styles.opacity !== undefined) cssRule += `opacity:${styles.opacity};`;
    if (styles.position) cssRule += `position:${styles.position};`;
    if (styles.top !== undefined) cssRule += `top:${styles.top}px;`;
    if (styles.left !== undefined) cssRule += `left:${styles.left}px;`;
    if (styles.right !== undefined) cssRule += `right:${styles.right}px;`;
    if (styles.bottom !== undefined) cssRule += `bottom:${styles.bottom}px;`;
    if (styles.zIndex !== undefined) cssRule += `z-index:${styles.zIndex};`;
    if (styles.cursor) cssRule += `cursor:${styles.cursor};`;
    if (styles.display) cssRule += `display:${styles.display};`;

    // Flexbox
    if (styles.flexDirection) cssRule += `flex-direction:${styles.flexDirection};`;
    if (styles.flexJustify) cssRule += `justify-content:${styles.flexJustify};`;
    if (styles.flexAlignItems) cssRule += `align-items:${styles.flexAlignItems};`;
    if (styles.flexWrap) cssRule += `flex-wrap:${styles.flexWrap};`;
    if (styles.flexGap !== undefined) cssRule += `gap:${styles.flexGap}px;`;
    if (styles.alignSelf) cssRule += `align-self:${styles.alignSelf};`;

    // Box-shadow
    if (styles.shadowColor) {
      const x = styles.shadowX ?? 0;
      const y = styles.shadowY ?? 0;
      const blur = styles.shadowBlur ?? 0;
      cssRule += `box-shadow:${x}px ${y}px ${blur}px ${styles.shadowColor};`;
    }

    cssRule += `}`;

    // Inserir no head
    let styleSheet = document.getElementById('dynamic-styles') as HTMLStyleElement;
    if (!styleSheet) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'dynamic-styles';
      document.head.appendChild(styleSheet);
    }
    styleSheet.innerHTML += cssRule;

    // Conteúdo e fontes
    if (styles.textContent !== undefined) {
      const tag = el.tagName.toLowerCase();

      if (['button', 'span', 'label', 'p', 'h1','h2','h3','h4','h5','h6','a'].includes(tag)) {
        const existingTextNode = Array.from(el.childNodes).find(
          node => node.nodeType === Node.TEXT_NODE
        ) as Text | undefined;

        if (existingTextNode) {
          existingTextNode.textContent = styles.textContent;
        } else {
          el.appendChild(document.createTextNode(styles.textContent));
        }
      }
    }

    // Imagem
    if (styles.imageSource && el instanceof HTMLImageElement) {
      el.src = styles.imageSource;
    }

    // Ícones
    if (styles.iconSource) {
      styles.iconSource.split(' ').forEach(cls => {
        if (cls) el.classList.add(cls);
      });
    }

    // Link
    if (styles.linkSource && el instanceof HTMLAnchorElement) {
      el.href = styles.linkSource;
    }
  }
}