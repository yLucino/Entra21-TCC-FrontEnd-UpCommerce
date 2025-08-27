import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-drag',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() btnDragId: string = '';
  @Output() created = new EventEmitter<string>();

  onUniqueIdCreated(id: string) {
    if (!this.btnDragId) {
      this.btnDragId = id;
      this.created.emit(id); 
    }
  }
}
