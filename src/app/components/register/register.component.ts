import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { UserRegister } from '../../models/classes/user';
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
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  registerObj: UserRegister = new UserRegister();

  onRegister() {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill the form', '', { duration: 3000 })
    } else {
      this.registerObj = Object.assign(new UserRegister(), this.registerForm.value);
      console.log(this.registerObj);
    }
  }
}
