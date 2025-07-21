import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-drag',
  templateUrl: './button-drag.component.html',
  styleUrls: ['./button-drag.component.css']
})
export class ButtonDragComponent {
  @Input() text: string = "Seu texto";
  @Input() typeCSS: string = "matButton";
}
