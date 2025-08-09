import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  searchTerm: string = '';
  inputDragId: string = '';

  @Output() created = new EventEmitter<string>();
  
  onUniqueIdCreated(id: string) {
    this.inputDragId = id;
    this.created.emit(id);
  }
}
