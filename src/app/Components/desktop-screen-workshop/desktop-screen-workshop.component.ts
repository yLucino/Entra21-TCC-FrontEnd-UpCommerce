import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EnvironmentInjector, EventEmitter, Injector, Input, NgZone, OnInit, Output, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { AreaComponent } from 'src/app/dragAndDrop/component/area/area.component';
import { ButtonSetScreen } from 'src/app/interfaces/buttonSetScreen.interface';
import { CdkService } from 'src/app/services/cdk.service';
import { PropertyService } from 'src/app/services/property.service';
import { ProjectInterface } from 'src/app/interfaces/project.interface';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';
import { ProjectHeader } from 'src/app/interfaces/projectHeader.interface';

@Component({
  selector: 'app-desktop-screen-workshop',
  templateUrl: './desktop-screen-workshop.component.html',
  styleUrls: ['./desktop-screen-workshop.component.css']
})
export class DesktopScreenWorkshopComponent implements OnInit {
  @ViewChildren('dropHost', { read: ViewContainerRef }) dropHosts!: QueryList<ViewContainerRef>;
  @ViewChildren('cdkDropList', { read: ViewContainerRef }) cdkDropLists!: QueryList<ViewContainerRef>;
  
  @Output() areaCreated = new EventEmitter<string>();
  @Output() elementDeselected = new EventEmitter<void>();
  
  @Input() connectedDropListId: string[] = [];

  @Input() projectId!: number;
  userId: number = Number(localStorage.getItem('userId'));
  
  project!: ProjectInterface;

  titleScreen: string = 'Início';
  currentScreen: string = 'homeScreen';
  list: string = "homeList";

  buttons: ButtonSetScreen[] = [
    { screen: 'homeScreen', class: 'fa-solid fa-house', title: 'Início', selected: true, list: 'homeList', active: true },
    { screen: 'paymentScreen', class: 'fa-solid fa-credit-card', title: 'Pagamento', selected: false, list: 'paymentList', active: false },
    { screen: 'perfilScreen', class: 'fa-solid fa-user', title: 'Perfil', selected: false, list: 'perfilList', active: false },
    { screen: 'configScreen', class: 'fa-solid fa-gear', title: 'Configurações', selected: false, list: 'configList', active: false },
    { screen: 'notifyScreen', class: 'fa-solid fa-bell', title: 'Notificações', selected: false, list: 'notifyList', active: false },
    { screen: 'messageScreen', class: 'fa-solid fa-envelope', title: 'Mensagens', selected: false, list: 'messageList', active: false },
    { screen: 'helpScreen', class: 'fa-solid fa-circle-question', title: 'Ajuda', selected: false, list: 'helpList', active: false },
    { screen: 'favScreen', class: 'fa-solid fa-heart', title: 'Favoritos', selected: false, list: 'favList', active: false },
    { screen: 'cartScreen', class: 'fa-solid fa-cart-shopping', title: 'Carrinho', selected: false, list: 'cartList', active: false },
    { screen: 'historyScreen', class: 'fa-solid fa-clock-rotate-left', title: 'Histórico', selected: false, list: 'historyList', active: false },
    { screen: 'reportsScreen', class: 'fa-solid fa-file-invoice', title: 'Relatórios', selected: false, list: 'reportsList', active: false },
    { screen: 'loginScreen', class: 'fa-solid fa-right-to-bracket', title: 'Login', selected: false, list: 'loginList', active: false },
  ];

  private lastSelectedElement: HTMLElement | null = null;

  isHoveringOverArea = false;
  canEnterSmartphone = () => !this.isHoveringOverArea;

  constructor(
    private ngZone: NgZone,
    private injector: EnvironmentInjector,
    private propertyService: PropertyService,
    private cdkService: CdkService,
    private vcr: ViewContainerRef,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.cdkService.setViewContainerRef(this.vcr);

    this.cdkService.buttons$.subscribe(button => {
      if (button) {
        this.buttons.find(b => b.screen === button.screen)!.active = true;
      }
    });

    this.propertyService.getSelectedElement().subscribe(el => {
      if (el) {
        if (this.lastSelectedElement) {
          this.lastSelectedElement.classList.remove('selected-component');
        }
        el.classList.add('selected-component');
        this.lastSelectedElement = el;
      }
    });

    if (this.userId && this.projectId)
    this.projectService.getProjectById(this.userId ,this.projectId).subscribe({
      next: (res) => {
        this.loadingProject(res);
        const data: ProjectHeader = {
          id: this.projectId,
          title: res.title,
          subTitle: res.subTitle,
          description: res.description,
          urlLogo: res.urlLogo
        }

        this.cdkService.updateProjectHeader(data);
      },
      error: (err) => {
        Swal.fire({
          toast: true,            
          position: 'top-end',    
          icon: 'error',    
          title: 'Erro ao carregar o projeto!',
          showConfirmButton: false,
          timer: 3000, 
          timerProgressBar: true
        });
        console.log(err);
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    const data = event.previousContainer.data[event.previousIndex];

    const currentHost = this.dropHosts.find((_, i) =>
      this.buttons[i].screen === this.currentScreen
    );

    if (!currentHost) return;

    const injector = Injector.create({
      providers: [
        { provide: 'text', useValue: data.text },
        { provide: 'typeCSS', useValue: data.typeCSS }
      ],
      parent: this.injector
    });

    const componentRef = currentHost.createComponent(data.component, { injector });
    const nativeEl = componentRef.location.nativeElement;

    this.attachSelectionListener(nativeEl);

    nativeEl.addEventListener('click', (event: any) => {
      event.stopPropagation();
      this.propertyService.setSelectedElement(nativeEl);
    });

    if (data.text === 'Área') {
      const instance = componentRef.instance as AreaComponent;
      instance.hovering.subscribe((hover: boolean) => this.isHoveringOverArea = hover);
      instance.created.subscribe((id: string) => {
         this.ngZone.run(() => {
          this.connectedDropListId.push(id);
          this.areaCreated.emit(id);

          this.cdr.detectChanges();
        });
      });
    }

    if ((componentRef.instance as any).created instanceof EventEmitter) {
      (componentRef.instance as any).created.subscribe();
    }
  }

  simulateDrop(compData: any, container: ViewContainerRef) {
    const compClass = this.cdkService.getComponentClass(compData.cdkId);
    if (!compClass) return;

    const injector = Injector.create({ providers: [], parent: this.injector });

    const componentRef = container.createComponent(compClass, { injector });
    const instance: any = componentRef.instance;
    const nativeEl = componentRef.location.nativeElement;

    if (instance instanceof AreaComponent) {
      instance.areaListId = compData.id;
      instance.childrenData = compData.children || [];
    } else {
      const keyMap: Record<string, string> = {
        ButtonComponent: 'btnDragId',
        LinkComponent: 'linkDragId',
        TextComponent: 'pDragId',
        IconComponent: 'iconDragId',
        ImageComponent: 'imageDragId',
        InputComponent: 'inputDragId'
      };
      const key = keyMap[instance.constructor.name];
      if (key) instance[key] = compData.id;
    }

    if (compData.style) {
      const innerEl = nativeEl.querySelector('.component') || nativeEl;
      this.cdkService.applyStylesToElement(compData, innerEl, compData.style);
    }

    nativeEl.addEventListener('click', (event: any) => {
      event.stopPropagation();
      this.attachSelectionListener(nativeEl);
    });

    if (instance instanceof AreaComponent && instance.viewContainerRef) {
      instance.childrenData.forEach((child: any) =>
        this.simulateDrop(child, instance.viewContainerRef)
      );

      instance.hovering.subscribe((hover: boolean) => this.isHoveringOverArea = hover);
      instance.created.subscribe((id: string) => {
        this.ngZone.run(() => {
          this.connectedDropListId.push(id);
          this.areaCreated.emit(id);
          this.cdr.detectChanges();
        });
      });
    }

    if (instance.created instanceof EventEmitter) {
      this.ngZone.run(() => instance.created.emit(compData.id));
    }
  }


  deselectElement(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const hasSelectedComponent = clickedElement.closest('.selected-component');

    if (!hasSelectedComponent && this.lastSelectedElement) {
      this.lastSelectedElement.classList.remove('selected-component');
      this.lastSelectedElement = null;
      this.propertyService.setSelectedElement(null);
      this.elementDeselected.emit();
    }
  }

  setScreen(btn: ButtonSetScreen) {
    if (this.currentScreen !== btn.screen) {
      this.propertyService.setSelectedElement(null);
      this.lastSelectedElement?.classList.remove('selected-component');
      this.lastSelectedElement = null;
      this.elementDeselected.emit();
    }

    this.currentScreen = btn.screen;
    this.titleScreen = btn.title;
    this.list = btn.list;
    this.setSelectedButton(btn);

    this.connectedDropListId = [btn.list];
    this.cdkService.transferScreen(btn);
  }

  setSelectedButton(btn: ButtonSetScreen) {
    this.buttons.forEach(button => {
      button.selected = (button === btn);
    });
  }

  private attachSelectionListener(nativeEl: HTMLElement) {
    nativeEl.addEventListener('click', (event) => {
      event.stopPropagation();

      if (this.lastSelectedElement) {
        this.lastSelectedElement.classList.remove('selected-component');
      }

      nativeEl.classList.add('selected-component');
      this.lastSelectedElement = nativeEl;

      this.propertyService.setSelectedElement(nativeEl);
    });
  }

  loadingProject(project: ProjectInterface) {
    this.project = project;

    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        const map = new Map<string, ViewContainerRef>();
        this.dropHosts.forEach((container, i) => {
          const id = this.buttons[i].list;
          map.set(id, container);
        });

        this.cdkService.setDropHostMap(map);

        project.component?.forEach(comp => {
          const parentCDK = map.get(comp.parentCdkId || this.list);
          if (parentCDK) {
            this.simulateDrop(comp, parentCDK);
          }
        });

        setTimeout(() => {
          this.connectedDropListId = [this.list];
          this.cdr.detectChanges();
        });
      });
    });
  }
}

