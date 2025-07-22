import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DragDropService {
  // Onde serão armazenados os elementos recebidos
  droppedItems$ = new BehaviorSubject<any[]>([]);

  addItem(item: any) {
    const current = this.droppedItems$.getValue();
    this.droppedItems$.next([...current, item]);
  }
}
