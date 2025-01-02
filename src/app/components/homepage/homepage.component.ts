import { MatSnackBar } from '@angular/material/snack-bar';
import { LogOut } from '../../models/classes/user';
import { IJsonResponse, ILoggedInUser, ISession } from '../../models/interfaces/response';
import { UserService } from './../../services/user.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatTableModule, TableModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  snackBar: MatSnackBar = inject(MatSnackBar);

  userService: UserService = inject(UserService);

  hit: number = 0;

  loggedInUser: ILoggedInUser = {
    email: '',
    role: '',
    loginId: 0
  }

  logoutObj: LogOut = new LogOut();

  updateCurrentUser(): void {
    const currentUser = localStorage.getItem("CurrentUser");
    if (currentUser) {
      this.loggedInUser = JSON.parse(currentUser);
      this.logoutObj.loginId = this.loggedInUser.loginId;
    }
  }

  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;

  startTimer: any;
  running: boolean = false;
  pauseStart: Date = new Date();

  breakStart: number = 0;
  time = '';

  start(): void {
    if (!this.running) {
      this.hit++;
      if (this.hit > 1) {
        this.userService.onPlayTimer(this.logoutObj).subscribe({
          next: (res: IJsonResponse) => {
            if (res.result) {
              this.snackBar.open(res.message, '', { duration: 3000 });
            }
          },
          error: (res: IJsonResponse) => {
            this.snackBar.open(res.message, '', { duration: 3000 });
          }
        })
      }
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
    this.userService.onPauseTimer(this.logoutObj).subscribe({
      next: (res: IJsonResponse) => {
        if (res.result) {
          this.snackBar.open(res.message, '', { duration: 3000 });
        }
      },
      error: (res: IJsonResponse) => {
        this.snackBar.open(res.message, '', { duration: 3000 });
      }
    })
  } // stop() end

  reset(): void {
    clearInterval(this.startTimer);
    this.running = false;
    this.hr = this.min = this.sec = this.ms = '0' + 0;
  } // reset() end

  ngOnInit(): void {
    this.updateCurrentUser();
    this.getUserSessions();
    this.userService.onSessionChange.subscribe((res:boolean)=>{
      if(res){
        this.getUserSessions();
      }
    })
  }

  userSessions: ISession[] = [];

  displayedColumns: string[] = ['Session-Id', 'User-Email', 'Login-Time', 'Logout-Time', 'Session-Time', 'No of Breaks', 'Break-Time'];

  getUserSessions(): void {
    this.userService.getAllSessions().subscribe({
      next: (res: IJsonResponse) => {
        if (res.result) {
          this.userSessions = res.data;
        }
      },
      error: (res: IJsonResponse) => {
        this.snackBar.open(res.message, '', { duration: 3000 });
      }
    })
  }

  deleteSession(id: number) {
    const rs = confirm("Do you want to delete this session?");
    if (rs) {
      this.userService.deleteSession(id).subscribe({
        next: (res: IJsonResponse) => {
          if (res) {
            this.snackBar.open(res.message, '', { duration: 3000 });
            this.userService.onSessionChange.next(true);
          }
        },
        error: (res: IJsonResponse) => {
          this.snackBar.open(res.message, '', { duration: 3000 })
        }
      })
    }
  }


  convertDuration(durationString: string): any {

    const regex1 = /PT([\d\.]+)S/;
    const regex2 = /PT(\d+)M(\d+\.\d+)S/;
    const matches1 = durationString.match(regex1);
    const matches2 = durationString.match(regex2);
    if (matches1) {
      const totalSeconds = parseFloat(matches1[1]);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = (totalSeconds % 60).toFixed(3);
      if (minutes == 0) {
        return `${seconds} seconds`;
      } else if (hours == 0) {
        return `${minutes} minutes, ${seconds} seconds`;
      } else if (hours != 0 && minutes != 0) {
        return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
      }

    } else if (matches2) {
      const minutes = parseInt(matches2[1], 10);
      const totalSeconds = parseFloat(matches2[2]);
      const hours = Math.floor(totalSeconds / 3600);
      const seconds = Math.floor(totalSeconds);
      const milliseconds = (totalSeconds - seconds) * 1000;
      if (minutes == 0) {
        return `${seconds} seconds`;
      } else if (hours == 0) {
        return `${minutes} minutes, ${seconds} seconds`;
      } else if (hours != 0 && minutes != 0) {
        return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
      }
    }
  }
}
