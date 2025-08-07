import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentDragDrop } from '../interfaces/component.dragdrop.interface';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private selectedElement$ = new BehaviorSubject<HTMLElement | null>(null);

  components: ComponentDragDrop[] = [];
  screens: ComponentDragDrop[] = [];

  setSelectedElement(element: HTMLElement | null) {
    const childWithId = element?.querySelector('[id]') as HTMLElement | null;

    if (childWithId) element = childWithId;

    this.selectedElement$.next(element);
  }

  getSelectedElement() {
    return this.selectedElement$.asObservable();
  }

  setComponentData(components: ComponentDragDrop[], screens: ComponentDragDrop[]) {
    this.components = components;
    this.screens = screens;
  }
}