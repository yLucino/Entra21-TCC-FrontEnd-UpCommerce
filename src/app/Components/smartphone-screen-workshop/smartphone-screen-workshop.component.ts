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
import { AreaComponent } from 'src/app/dragAndDrop/screen/area/area.component';
import { PropertyService } from 'src/app/services/property.service';
import { PropertiesWorkshopComponent } from '../properties-workshop/properties-workshop.component';

@Component({
  selector: 'app-smartphone-screen-workshop',
  templateUrl: './smartphone-screen-workshop.component.html',
  styleUrls: ['./smartphone-screen-workshop.component.css']
})
export class SmartphoneScreenWorkshopComponent implements OnInit {
  @ViewChild('propertiesWorkshop') propertiesWorkshop!: PropertiesWorkshopComponent;
  @Input() connectedDropListId: string[] = [];
  @Output() areaCreated = new EventEmitter<string>();
  @Output() elementDeselected = new EventEmitter<void>();
  currentTime: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  @ViewChild('dropHost', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  private lastSelectedElement: HTMLElement | null = null;

  isHoveringOverArea = false;
  canEnterSmartphone = () => !this.isHoveringOverArea;

  constructor(
    private injector: EnvironmentInjector,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
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
}
