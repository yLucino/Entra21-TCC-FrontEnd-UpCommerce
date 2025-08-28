import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-layouts',
  templateUrl: './card-layouts.component.html',
  styleUrls: ['./card-layouts.component.css'],
})
export class CardLayoutsComponent {
  @Input() id!: number;
  @Input() title!: string;
  @Input() infos!: string;
  @Input() tag = { icon: '', text: '' };
  @Input() img = { url1: '', url2: '', url3: '' };
}
