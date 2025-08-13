import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CdkScreen } from '../interfaces/cdkScreen.interface';
import { ButtonSetScreen } from '../interfaces/buttonSetScreen.interface';

@Injectable({ providedIn: 'root' })
export class CdkService {
  private buttonsSource = new BehaviorSubject<ButtonSetScreen | null>(null);
  private screenSource = new BehaviorSubject<ButtonSetScreen | null>(null);

  buttons$ = this.buttonsSource.asObservable();
  screenId$ = this.screenSource.asObservable();

  addButton(button: ButtonSetScreen) {
    this.buttonsSource.next(button);
  }
  
  transferScreen(btn: ButtonSetScreen) {
    this.screenSource.next(btn);
  }
}