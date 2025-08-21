import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appUniqueId]'
})
export class UniqueIdDirective implements OnInit {
  @Input() nameTag!: string;
  @Output() uniqueIdCreated = new EventEmitter<string>();

  ngOnInit(): void {
    const uniqueId = `${this.nameTag}-${Math.floor(Math.random() * 1_000_000)}`;

    setTimeout(() => {
      this.uniqueIdCreated.emit(uniqueId);
    });
  }
}
