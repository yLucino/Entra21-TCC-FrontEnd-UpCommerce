import {
  Component,
  Input,
  Output,
  EventEmitter,
  EnvironmentInjector,
  Injector,
  ViewChild,
  ViewContainerRef,
  OnInit
} from '@angular/core';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AreaComponent } from 'src/app/dragAndDrop/component/area/area.component';
import { PropertyService } from 'src/app/services/property.service';
import { PropertiesWorkshopComponent } from '../properties-workshop/properties-workshop.component';
import { ButtonSetScreen } from 'src/app/interfaces/buttonSetScreen.interface';
import { CdkService } from 'src/app/services/cdk.service';

@Component({
  selector: 'app-smartphone-screen-workshop',
  templateUrl: './smartphone-screen-workshop.component.html',
  styleUrls: ['./smartphone-screen-workshop.component.css']
})
export class SmartphoneScreenWorkshopComponent implements OnInit {
  @ViewChild('propertiesWorkshop') propertiesWorkshop!: PropertiesWorkshopComponent;
  @ViewChild('dropHost', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;
  
  @Input() connectedDropListId: string[] = [];
  
  @Output() areaCreated = new EventEmitter<string>();
  @Output() elementDeselected = new EventEmitter<void>();

  currentTime: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  titleScreen: string = 'Início'; 
  currentScreen: string = 'homeScreen'; 
  
  buttons: ButtonSetScreen[] = [
    { screen: 'homeScreen', class: 'fa-solid fa-house', title: 'Início', selected: true, list: 'homeList' },
  ];

  private lastSelectedElement: HTMLElement | null = null;

  isHoveringOverArea = false;
  canEnterSmartphone = () => !this.isHoveringOverArea;

  constructor(
    private injector: EnvironmentInjector,
    private propertyService: PropertyService,
    private cdkService: CdkService
  ) {}

  ngOnInit() {
    this.cdkService.buttons$.subscribe(button => {
      if (button) {
        const exists = this.buttons.some(b => b.screen === button.screen);
        if (!exists) {
          this.buttons.push(button);
        }
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

    const injector = Injector.create({
      providers: [
        { provide: 'text', useValue: data.text },
        { provide: 'typeCSS', useValue: data.typeCSS }
      ],
      parent: this.injector
    });

    const componentRef = this.viewContainerRef.createComponent(data.component, { injector });
    const nativeElement = componentRef.location.nativeElement;

    nativeElement.addEventListener('click', () => {
      this.propertyService.setSelectedElement(nativeElement);
    });

    if (data.text === 'Área') {
      const instance = componentRef.instance as AreaComponent;
      instance.hovering.subscribe((hover: boolean) => this.isHoveringOverArea = hover);
      instance.created.subscribe((id: string) => this.areaCreated.emit(id));
    }

    // Se o componente possuir um Output chamado "created", escuta o evento
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

  // Function to set the current screen based on the button clicked
  setScreen(btn: ButtonSetScreen) {
    this.currentScreen = btn.screen;
    this.titleScreen = btn.title;
    this.setSelectedButton(btn);

    if (this.currentScreen !== btn.screen) {
      this.propertyService.setSelectedElement(null);
      this.elementDeselected.emit();
    }

    this.cdkService.transferScreen(btn);
  }

  setSelectedButton(btn: ButtonSetScreen) {
    this.buttons.forEach(button => {
      if (button === btn) {
        button.selected = true;
      } else {
        button.selected = false;
      }
    });
  }
}
