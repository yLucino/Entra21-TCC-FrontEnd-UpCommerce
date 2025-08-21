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

export interface ProjectHeader {
  title: string;
  subTitle: string;
  description: string;
  urlLogo: string;
}

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

  buttons$ = this.buttonsSource.asObservable();
  screenId$ = this.screenSource.asObservable();

  private viewContainerRef!: ViewContainerRef;
  private projectHeaderSource = new BehaviorSubject<ProjectHeader>({
    title: '',
    subTitle: '',
    description: '',
    urlLogo: ''
  });

  projectHeader$ = this.projectHeaderSource.asObservable();

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

    const styles: ComponentStyles = {
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
      borderColor: computed.borderColor,
      borderType: computed.borderStyle,
      borderRadiusTopLeft: parseInt(computed.borderTopLeftRadius) || 0,
      borderRadiusTopRight: parseInt(computed.borderTopRightRadius) || 0,
      borderRadiusBottomLeft: parseInt(computed.borderBottomLeftRadius) || 0,
      borderRadiusBottomRight: parseInt(computed.borderBottomRightRadius) || 0,
      backgroundColor: computed.backgroundColor,
      color: computed.color,
      fontFamily: computed.fontFamily,
      textContent: element.textContent?.trim() || "",
      fontSize: parseInt(computed.fontSize) || 0,
      fontWeight: computed.fontWeight,
      textAlign: computed.textAlign,
      opacity: parseFloat(computed.opacity) || 1,
      shadowX: 0, shadowY: 0, shadowBlur: 0, shadowColor: "#000000",
      position: computed.position,
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
      cursor: computed.cursor,
      display: computed.display,
      flexDirection: computed.flexDirection,
      flexJustify: computed.justifyContent,
      flexAlign: computed.alignContent,
      flexWrap: computed.flexWrap,
      flexGap: parseInt((computed as any).gap || "0"),
      flexAlignItems: computed.alignItems,
      alignSelf: computed.alignSelf,
      newComponentId: element.id || "",
      imageSource: element.getAttribute("src") || "",
      iconSource: "",
      linkSource: element.getAttribute("href") || ""
    };

    const children: CdkComponent[] = Array.from(element.children)
      .filter(c => c instanceof HTMLElement)
      .map(c => this.serializeComponent(c as HTMLElement))
      .filter(c => c.id || c.cdkId || c.styles);

    return {
      id: element.id || '',
      cdkId: element.parentElement?.parentElement?.getAttribute('id') || '',
      styles,
      children
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
          if (component) rootComponents.push(component);
        });
    });
    
    const header = this.getProjectHeader();
    
    const projeto: ProjectInterface = {
      urlLogo: header.urlLogo || "URL da Logo do Projeto",
      title: header.title || "Nome do Projeto",
      subTitle: header.subTitle || "Slogan do Projeto",
      description: header.description || "Descrição do Projeto",
      component: rootComponents.length ? rootComponents : undefined
    };

    console.log("PROJETO JSON:", JSON.stringify(projeto, null, 2));
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
    } else {
      delete component.children;
    }

    return component;
  }




  // Rendenizar Json Para CDK
  deserializeComponent(compData: any, parentEl: HTMLElement): void {
    if (!this.viewContainerRef) {
      console.error("ViewContainerRef não foi definido!");
      return;
    }

    const componentRef: any = this.viewContainerRef.createComponent(
      this.getComponentClass(compData.type)
    );

    if (compData.id) componentRef.location.nativeElement.id = compData.id;

    Object.entries(compData.styles).forEach(([key, value]) => {
      if (key in componentRef.instance) {
        (componentRef.instance as any)[key] = this.parseValue(value);
      }
    });

    parentEl.appendChild(componentRef.location.nativeElement);

    compData.children.forEach((child: any) => {
      this.deserializeComponent(child, componentRef.location.nativeElement);
    });
  }

  deserializeProjeto(project: ProjectInterface): void {
    this.dropZonesIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = "";
    });

    if (!project.component) return;

    project.component.forEach(comp => {
      const parentCdkId = comp.cdkId;
      const parentEl = document.getElementById(parentCdkId);

      if (parentEl) {
        this.deserializeComponent(comp, parentEl);
      }
    });
  }

  parseValue(value: any): any {
    if (!isNaN(value) && value !== "") return Number(value);
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  }

  getComponentClass(type: string): any {
    switch(type.toLowerCase()) {
      case "areacomponent": return AreaComponent;
      case "buttoncomponent": return ButtonComponent;
      case "textcomponent": return TextComponent;
      case "imagecomponent": return ImageComponent;
      case "inputcomponent": return InputComponent;
      case "iconcomponent": return IconComponent;
      case "linkcomponent": return LinkComponent;
    }
  }
}