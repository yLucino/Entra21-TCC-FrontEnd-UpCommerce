import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragDropService } from 'src/app/services/drag-drop.service';

@Component({
  selector: 'app-smartphone-screen-workshop',
  templateUrl: './smartphone-screen-workshop.component.html',
})
export class SmartphoneScreenWorkshopComponent implements OnInit {
  droppedItems: any[] = [];

  constructor(private dragDropService: DragDropService) {}

  ngOnInit() {
    this.dragDropService.droppedItems$.subscribe(items => {
      this.droppedItems = items;
    });
  }

  onDrop(event: CdkDragDrop<any>) {
    const droppedData = event.item.data;
    this.dragDropService.addItem(droppedData);
  }
}
