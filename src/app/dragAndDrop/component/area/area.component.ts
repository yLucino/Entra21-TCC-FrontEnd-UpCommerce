import {
  Component,
  EnvironmentInjector,
  EventEmitter,
  HostListener,
  Injector,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent {
  areaListId: string = '';
  @Output() hovering = new EventEmitter<boolean>();
  @Output() created = new EventEmitter<string>();
  @ViewChild('dropHost', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  constructor(private injector: EnvironmentInjector) {}

  isHoveringOverArea = false;
  canEnterArea = () => !this.isHoveringOverArea;

  drop(event: CdkDragDrop<any[]>) {
    const data = event.previousContainer.data[event.previousIndex];

    const injector = Injector.create({
      providers: [
        { provide: 'text', useValue: data.text },
        { provide: 'typeCSS', useValue: data.typeCSS },
      ],
      parent: this.injector
    });

    const componentRef = this.viewContainerRef.createComponent(data.component, { injector });

    if (data.text === 'Área') {
      const instance = componentRef.instance as AreaComponent;
      instance.hovering.subscribe((hover: boolean) => this.isHoveringOverArea = hover);
      instance.created.subscribe((id: string) => this.created.emit(id));
    }
  }

  @HostListener('mouseenter') onEnter() {
    this.hovering.emit(true);
  }

  @HostListener('mouseleave') onLeave() {
    this.hovering.emit(false);
  }

  onUniqueIdCreated(id: string) {
    setTimeout(() => {
      this.areaListId = id;
      this.created.emit(id);
    });
  }
}
