import { Component, Input, Output, EventEmitter, EnvironmentInjector, Injector, ViewContainerRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AreaComponent } from 'src/app/dragAndDrop/component/area/area.component';
import { PropertyService } from 'src/app/services/property.service';
import { ButtonSetScreen } from 'src/app/interfaces/buttonSetScreen.interface';
import { CdkService } from 'src/app/services/cdk.service';
import { ProjectInterface } from 'src/app/interfaces/project.interface';

@Component({
  selector: 'app-smartphone-screen-workshop',
  templateUrl: './smartphone-screen-workshop.component.html',
  styleUrls: ['./smartphone-screen-workshop.component.css']
})
export class SmartphoneScreenWorkshopComponent implements OnInit {
  @ViewChildren('dropHost', { read: ViewContainerRef }) dropHosts!: QueryList<ViewContainerRef>;
  @ViewChildren('cdkDropList', { read: ViewContainerRef }) cdkDropLists!: QueryList<ViewContainerRef>;
  
  @Output() areaCreated = new EventEmitter<string>();
  @Output() elementDeselected = new EventEmitter<void>();
  
  @Input() connectedDropListId: string[] = [];

  project!: ProjectInterface;

  currentTime: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  titleScreen: string = 'Início';
  currentScreen: string = 'homeScreen';

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
    private injector: EnvironmentInjector,
    private propertyService: PropertyService,
    private cdkService: CdkService,
    private vcr: ViewContainerRef
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
        this.connectedDropListId.push(id);
        this.areaCreated.emit(id);
      });
    }

    if ((componentRef.instance as any).created instanceof EventEmitter) {
      (componentRef.instance as any).created.subscribe();
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
}
