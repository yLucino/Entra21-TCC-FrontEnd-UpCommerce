import { Component, EnvironmentInjector, EventEmitter, HostListener, Injector, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-area',
  template: `
    <div 
      class="child-drop-zone"
      cdkDropList
      #areaList="cdkDropList"
      [id]="'areaList'"
      [cdkDropListData]="droppedItems"
      [cdkDropListConnectedTo]="['toolsComponentList', 'toolsScreenList']"
      (cdkDropListDropped)="drop($event)">
      <ng-container *ngFor="let item of droppedItems">
        <ng-container
          *ngComponentOutlet="item.component; injector: item.injector">
        </ng-container>
      </ng-container>
    </div>`,
  styleUrls: ['./area.component.css']
})
export class AreaComponent{
  droppedItems: { component: any, injector: Injector }[] = [];
  
  constructor(
    private injector: EnvironmentInjector,
  ) {}
  
  drop(event: CdkDragDrop<any[]>) {
    const data = event.previousContainer.data[event.previousIndex];

    const injector = Injector.create({
      providers: [
        { provide: 'text', useValue: data.text },
        { provide: 'typeCSS', useValue: data.typeCSS },
      ],
      parent: this.injector
    });

    this.droppedItems.push({
      component: data.component,
      injector
    });
  }

  @Output() hovering = new EventEmitter<boolean>();

  @HostListener('mouseenter') onEnter() {
    this.hovering.emit(true);
  }

  @HostListener('mouseleave') onLeave() {
    this.hovering.emit(false);
  }
}
