import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  imageDragId: string = '';
  @Output() created = new EventEmitter<string>();

  onUniqueIdCreated(id: string) {
    this.imageDragId = id;
    this.created.emit(id);
  }
}
