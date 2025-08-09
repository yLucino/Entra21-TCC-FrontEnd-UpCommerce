import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-drag',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  btnDragId: string = '';
  @Output() created = new EventEmitter<string>();

  onUniqueIdCreated(id: string) {
    this.btnDragId = id;
    this.created.emit(id);
  }
}
