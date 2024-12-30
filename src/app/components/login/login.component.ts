import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLogin } from '../../models/classes/user';
import { IJsonResponse } from '../../models/interfaces/response';

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
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  loginObj: UserLogin = new UserLogin();

  onLogin() {
    this.loginObj = Object.assign(new UserLogin(), this.loginForm.value);
    console.log(this.loginObj);

    this.userService.onLogin(this.loginObj).subscribe({
      next: (res: IJsonResponse) => {
        if (res.result) {
          this.snackBar.open(res.message, '', { duration: 3000 });
          this.router.navigateByUrl("/layout");
        }
      },
      error: (res: IJsonResponse) => {
        this.snackBar.open(res.message, '', { duration: 3000 });
      }
    })
  }// onLogin() end
}
