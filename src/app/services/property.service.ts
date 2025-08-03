import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private selectedElement$ = new BehaviorSubject<HTMLElement | null>(null);

  setSelectedElement(element: HTMLElement) {
    const childWithId = element.querySelector('[id]') as HTMLElement | null;

    if (childWithId) element = childWithId;

    this.selectedElement$.next(element);
  }

  getSelectedElement() {
    return this.selectedElement$.asObservable();
  }
}