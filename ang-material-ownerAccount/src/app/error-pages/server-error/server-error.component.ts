import { Component } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent {
  reportedError: boolean;
  errorPercentage: number = 0;
  timer: any;

  constructor() { }

  public checkChanged = (event) => {
    this.reportedError = event.checked;
    this.reportedError ? this.startTimer() : this.stopTimer();
  }

  private startTimer = () => {
    this.timer = setInterval(() => {
      this.errorPercentage += 1;
      if (this.errorPercentage === 100) {
        clearInterval(this.timer);
      }
    }, 30)
  }

  private stopTimer = () => {
    clearInterval(this.timer);
    this.errorPercentage = 0;
  }
}
