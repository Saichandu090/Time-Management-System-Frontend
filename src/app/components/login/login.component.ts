import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLogin } from '../../models/classes/user';
import { IJsonResponse, ILoggedInUser } from '../../models/interfaces/response';
import { Constant } from '../../constants/constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  fb: FormBuilder = inject(FormBuilder);

  snackBar: MatSnackBar = inject(MatSnackBar);

  userService: UserService = inject(UserService);

  router: Router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  loginObj: UserLogin = new UserLogin();

  loggedInUser:ILoggedInUser={
    email:'',
    role:'',
    loginId:0
  }

  onLogin() {
    this.loginObj = Object.assign(new UserLogin(), this.loginForm.value);
    console.log(this.loginObj);

    this.userService.onLogin(this.loginObj).subscribe({
      next: (res: IJsonResponse) => {
        if (res.result) {
          this.loggedInUser=res.data[0];
          console.log(this.loggedInUser);
          localStorage.setItem("CurrentUser",JSON.stringify(this.loggedInUser));
          localStorage.setItem(Constant.LOGIN_TOKEN,res.message);
          this.snackBar.open('Login Success', '', { duration: 3000 });
          this.router.navigateByUrl("/layout");
        }
      },
      error: (res: IJsonResponse) => {
        this.snackBar.open(res.message, '', { duration: 3000 });
      }
    })
  }// onLogin() end
}
