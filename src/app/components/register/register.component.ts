import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { UserRegister } from '../../models/classes/user';
import { IJsonResponse } from '../../models/interfaces/response';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  fb: FormBuilder = inject(FormBuilder);

  snackBar: MatSnackBar = inject(MatSnackBar);

  userService: UserService = inject(UserService);

  router: Router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    firstName: new FormControl('', [Validators.required,Validators.pattern("^[A-Z][a-zA-Z ]{2,}$")]),
    lastName: new FormControl('', [Validators.required,Validators.pattern("^[A-Z][a-zA-Z ]{2,}$")]),
    dob: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  registerObj: UserRegister = new UserRegister();

  onRegister() {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill the form', '', { duration: 3000 })
    } else {
      this.registerObj = Object.assign(new UserRegister(), this.registerForm.value);
      console.log(this.registerObj);
      this.userService.onRegister(this.registerObj).subscribe({
        next:(res:IJsonResponse)=>{
          if(res.result){
            this.snackBar.open(res.message,'',{duration:3000})
            this.router.navigateByUrl('/login');
          }
        },
        error:(res:IJsonResponse)=>{
          this.snackBar.open(res.message,'',{duration:3000});
        }
      })
    }
  }// onRegister() end
}
