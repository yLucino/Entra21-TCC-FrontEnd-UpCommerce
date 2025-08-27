import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() iconDragId: string = '';
  @Output() created = new EventEmitter<string>();

  onUniqueIdCreated(id: string) {
    if (!this.iconDragId) {
      this.iconDragId = id;
      this.created.emit(id);
    }
  }
}
