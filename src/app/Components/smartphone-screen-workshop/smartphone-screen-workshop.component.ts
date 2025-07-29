import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Injector } from '@angular/core';
import { EnvironmentInjector } from '@angular/core';

@Component({
  selector: 'app-smartphone-screen-workshop',
  templateUrl: './smartphone-screen-workshop.component.html',
  styleUrls: ['./smartphone-screen-workshop.component.css']
})
export class SmartphoneScreenWorkshopComponent {
  @Input() connectedDropListId: string = '';

  // droppedItems: any[] = [];

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
  //   } else {
  //     const item = event.previousContainer.data[event.previousIndex];
  //     this.droppedItems.splice(event.currentIndex, 0, item);
  //   }
  // }

    droppedItems: { component: any, injector: Injector }[] = [];

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

    this.droppedItems.push({
      component: data.component,
      injector
    });
  }
}
