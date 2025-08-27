import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {
  @Input() linkDragId: string = '';
  @Output() created = new EventEmitter<string>();

  onUniqueIdCreated(id: string) {
    if (!this.linkDragId) {
      this.linkDragId = id;
      this.created.emit(id);
    }
  }
}
