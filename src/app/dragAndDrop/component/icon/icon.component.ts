import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  iconDragId: string = '';
  @Output() created = new EventEmitter<string>();

  onUniqueIdCreated(id: string) {
    setTimeout(() => {
      this.iconDragId = id;
      this.created.emit(id);
    });
  }
}
