import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  noOfBreaks: number = 0;

  breakTime: number = 0;

  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;

  startTimer: any;
  running: boolean = false;
  pauseStart: Date = new Date();

  breakStart: number = 0;
  time='';

  start(): void {
    if (!this.running) {
      this.running = true;
      this.startTimer = setInterval(() => {
        this.ms++;
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms;

        if (this.ms === 100) {
          this.sec++;
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
          this.ms = '0' + 0;
        }

        if (this.sec === 60) {
          this.min++;
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }

        if (this.min === 60) {
          this.hr++;
          this.hr = this.hr < 10 ? '0' + this.hr : this.hr;
          this.min = '0' + 0;
        }
      }, 10);
    } else {
      this.stop();
    }
  } // start() end


  stop(): void {
    clearInterval(this.startTimer);
    this.running = false;
    this.noOfBreaks++;
    this.breakTime = JSON.parse(this.sec) + this.breakTime;
  } // stop() end

  reset(): void {
    clearInterval(this.startTimer);
    this.running = false;
    this.hr = this.min = this.sec = this.ms = '0' + 0;
    this.noOfBreaks = 0;
  } // reset() end

  ngOnInit(): void {
    this.breakStart = this.pauseStart.getTime();

    const date=new Date(this.breakStart);
    const hours = date.getHours(); // Get the hours
    const minutes = date.getMinutes(); // Get the minutes
    const seconds = date.getSeconds(); // Get the seconds

    // Format the time in HH:mm:ss format
    this.time= `${hours}:${minutes}:${seconds}`;
  }

}
