import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IJsonResponse, ILoggedInUser } from '../../models/interfaces/response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,MatSidenavModule, MatButtonModule,MatMenuModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

  userService: UserService = inject(UserService);

  snackBar: MatSnackBar = inject(MatSnackBar);

  router: Router = inject(Router);

  showFiller = false;

  loggedInUser: ILoggedInUser = {
    email: '',
    role: '',
    loginId: 0
  }

  updateCurrentUser(): void{
    const currentUser = localStorage.getItem("CurrentUser");
    if (currentUser) {
      this.loggedInUser = JSON.parse(currentUser);
    }
  }

  onLogOut() {
    const rs = confirm("Do you want to logout?");
    if (rs) {
      this.userService.onLogOut(this.loggedInUser.loginId, this.loggedInUser).subscribe({
        next: (res: IJsonResponse) => {
          this.snackBar.open(res.message, '', { duration: 3000 });
          localStorage.clear();
          this.router.navigateByUrl("/login");
        },
        error: (res: IJsonResponse) => {
          this.snackBar.open(res.message, '', { duration: 3000 })
        }
      })
    }
  }//onLogOut() end

  ngOnInit(): void {
    this.updateCurrentUser();
  }
}
