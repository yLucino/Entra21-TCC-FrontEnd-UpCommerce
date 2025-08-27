import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  searchTerm: string = '';
  @Input() inputDragId: string = '';

  @Output() created = new EventEmitter<string>();

  onUniqueIdCreated(id: string) {
    if (!this.inputDragId) {
      this.inputDragId = id;
      this.created.emit(id);
    }
  }
}
