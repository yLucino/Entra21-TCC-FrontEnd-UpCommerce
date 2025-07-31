import {
  Component,
  EnvironmentInjector,
  EventEmitter,
  HostListener,
  Injector,
  OnInit,
  Output
} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  areaListId: string = '';
  @Output() hovering = new EventEmitter<boolean>();
  @Output() created = new EventEmitter<string>();

  droppedItems: { component: any, injector: Injector }[] = [];

  constructor(private injector: EnvironmentInjector) {}

  ngOnInit(): void {
    const uniqueId = Math.floor(Math.random() * 10000000);
    this.areaListId = `areaList-${uniqueId}`;
    this.created.emit(this.areaListId); // emite para o pai
  }

  drop(event: CdkDragDrop<any[]>) {
    const data = event.previousContainer.data[event.previousIndex];

    const injector = Injector.create({
      providers: [
        { provide: 'text', useValue: data.text },
        { provide: 'typeCSS', useValue: data.typeCSS },
      ],
      parent: this.injector
    });

    this.droppedItems.push({
      component: data.component,
      injector
    });
  }

  @HostListener('mouseenter') onEnter() {
    this.hovering.emit(true);
  }

  @HostListener('mouseleave') onLeave() {
    this.hovering.emit(false);
  }
}
