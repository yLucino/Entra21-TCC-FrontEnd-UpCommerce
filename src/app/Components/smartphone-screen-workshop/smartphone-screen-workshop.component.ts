import {
  Component,
  Input,
  Output,
  EventEmitter,
  EnvironmentInjector,
  Injector,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AreaComponent } from 'src/app/dragAndDrop/area/area.component';

@Component({
  selector: 'app-smartphone-screen-workshop',
  templateUrl: './smartphone-screen-workshop.component.html',
  styleUrls: ['./smartphone-screen-workshop.component.css']
})
export class SmartphoneScreenWorkshopComponent {
  @Input() connectedDropListId: string[] = [];
  @Output() areaCreated = new EventEmitter<string>(); // 👈 Emissor para o pai

  @ViewChild('dropHost', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  isHoveringOverArea = false;
  canEnterSmartphone = () => !this.isHoveringOverArea;

  constructor(private injector: EnvironmentInjector) {}

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

    if (data.text === 'Área') {
      const instance = componentRef.instance as AreaComponent;
      instance.hovering.subscribe((hover: boolean) => this.isHoveringOverArea = hover);
      instance.created.subscribe((id: string) => this.areaCreated.emit(id)); // 👈 emite novo ID
    }
  }
}
