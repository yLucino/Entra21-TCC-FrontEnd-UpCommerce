import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-drag',
  templateUrl: './button-drag.component.html',
})
export class ButtonDragComponent {
  btnDragId: string = '';
  @Output() created = new EventEmitter<string>();
  @Input() textBtn: string = 'Botão';
  @Input() matType: string = 'mat-button';

  onUniqueIdCreated(id: string) {
    this.btnDragId = id;
    this.created.emit(id);
  }
}
