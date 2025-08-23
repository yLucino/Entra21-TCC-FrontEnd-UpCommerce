import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-pop-up',
  templateUrl: './loading-pop-up.component.html',
  styleUrls: ['./loading-pop-up.component.css']
})
export class LoadingPopUpComponent implements OnInit {
  @Input() projectTitle: string = '';
  isVisible: boolean = true;
  progress: number = 0;

  ngOnInit(): void {
    if (this.isVisible) {
      this.startLoading();
    }
  }

  private startLoading(): void {
    const interval = setInterval(() => {
      this.progress += 2;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(interval);
        setTimeout(() => this.isVisible = false, 500);
      }
    }, 100);
  }
}
