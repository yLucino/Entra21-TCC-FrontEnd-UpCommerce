import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  @Input() imageDragId: string = '';
  @Output() created = new EventEmitter<string>();

  onUniqueIdCreated(id: string) {
    if (!this.imageDragId) {
      this.imageDragId = id;
      this.created.emit(id);
    }
  }
}
