import { Component, EnvironmentInjector, EventEmitter, HostListener, Injector, Input, Output, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkService } from 'src/app/services/cdk.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements AfterViewInit {
  @Input() areaListId: string = '';
  @Input() childrenData: any[] = [];
  @Input() parentSimulateDrop!: (compData: any, container: ViewContainerRef) => void; // Função passada do pai

  @Output() hovering = new EventEmitter<boolean>();
  @Output() created = new EventEmitter<string>();

  @ViewChild('dropHost', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  isHoveringOverArea = false;
  canEnterArea = () => !this.isHoveringOverArea;

  constructor(private injector: EnvironmentInjector, private cdkService: CdkService) {}

  ngOnInit() {
    if (this.areaListId) this.created.emit(this.areaListId);
  }

  ngAfterViewInit() {
    this.renderChildren();
  }

  private renderChildren() {
    if (!this.viewContainerRef || !this.childrenData.length) return;
    if (!this.parentSimulateDrop) return;

    this.childrenData.forEach(childData => {
      // Deserializa cada filho usando a função do pai
      this.parentSimulateDrop(childData, this.viewContainerRef);
    });
  }

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

    // Se for AreaComponent, configura eventos de hover e created
    if (componentRef.instance instanceof AreaComponent) {
      const instance = componentRef.instance as AreaComponent;
      instance.hovering.subscribe((hover: boolean) => this.isHoveringOverArea = hover);
      instance.created.subscribe((id: string) => this.created.emit(id));
      instance.parentSimulateDrop = this.parentSimulateDrop; // passa função para filhos
    }
  }

  @HostListener('mouseenter') onEnter() {
    this.hovering.emit(true);
  }

  @HostListener('mouseleave') onLeave() {
    this.hovering.emit(false);
  }

  onUniqueIdCreated(id: string) {
    if (!this.areaListId) {
      this.areaListId = id;
      this.created.emit(id);
    }
  }
}
