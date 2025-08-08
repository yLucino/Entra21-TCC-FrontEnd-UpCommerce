import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-drag',
  templateUrl: './button-drag.component.html',
})
export class ButtonDragComponent {
  btnDragId: string = '';
  @Output() created = new EventEmitter<string>();

  onUniqueIdCreated(id: string) {
    this.btnDragId = id;
    this.created.emit(id);
  }
}
