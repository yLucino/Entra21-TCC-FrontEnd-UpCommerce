import { Component, Inject, Optional } from '@angular/core';

@Component({
  selector: 'app-button-drag',
  template: `
    <ng-container [ngSwitch]="matType">
      <button *ngSwitchCase="'mat-button'" mat-button>
        {{ textBtn }}
      </button>

      <button *ngSwitchCase="'mat-raised-button'" mat-raised-button>
        {{ textBtn }}
      </button>

      <button *ngSwitchCase="'mat-stroked-button'" mat-stroked-button>
        {{ textBtn }}
      </button>

      <button *ngSwitchCase="'mat-flat-button'" mat-flat-button>
        {{ textBtn }}
      </button>

      <button *ngSwitchDefault mat-button>
        {{ textBtn }}
      </button>
    </ng-container>
  `
})
export class ButtonDragComponent {
  constructor(
    @Optional() @Inject('textBtn') public textBtn: string,
    @Optional() @Inject('matType') public matType: string,
  ) {
    this.textBtn = this.textBtn || 'Botão';
    this.matType = this.matType || 'mat-button';
  }
}
