import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IJsonResponse, ILoggedInUser } from '../../models/interfaces/response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  userService: UserService=inject(UserService);

  snackBar:MatSnackBar=inject(MatSnackBar);

  router:Router=inject(Router);

  loggedInUser:ILoggedInUser={
    email:'',
    role:'',
    loginId:0
  }

  onLogOut(){
    const rs=confirm("Do you want to logout?");
    if(rs){
      const currentUser=localStorage.getItem("CurrentUser");
      if(currentUser){
        this.loggedInUser=JSON.parse(currentUser);
      }
      this.userService.onLogOut(this.loggedInUser.loginId,this.loggedInUser).subscribe({
        next:(res:IJsonResponse)=>{
          this.snackBar.open(res.message,'',{duration:3000});
          localStorage.clear();
          this.router.navigateByUrl("/login");
        },
        error:(res:IJsonResponse)=>{
          this.snackBar.open(res.message,'',{duration:3000})
        }
      })
    }
  }//onLogOut() end
}
