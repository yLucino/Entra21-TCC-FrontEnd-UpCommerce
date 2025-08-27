import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  @Input() pDragId: string = '';
  @Input() pText: string = 'Seu texto!';
  @Output() created = new EventEmitter<string>();

  onUniqueIdCreated(id: string) {
    if (!this.pDragId) {
      this.pDragId = id;
      this.created.emit(id);
    }
  }
}
