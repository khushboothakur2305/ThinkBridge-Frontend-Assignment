import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { AlertService } from '../../../shared/service/Alert/alert.service';
import { passwordCheck } from '../../../shared/Validators/passwordValidator';
import { UserDataService } from 'src/app/shared/service/userData/user-data.service';
import { ErrorMessageService } from 'src/app/shared/service/ErrorMessage/error-message.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  LoginSubscription: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private userDataService: UserDataService,
    private errorService: ErrorMessageService
  ) {}
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {}
  Login() {
    if (this.LoginForm.valid) {
      this.LoginSubscription = this.authService
        .loginUser(this.LoginForm.value)
        .subscribe(
          (res: any) => {
            this.userDataService.setUserData(res?.data);
            this.alertService.showSnackBar(res?.message, true);
            this.LoginForm.reset();
            this.router.navigate(['/dashboard/list']);
          },
          (err) => {
            this.errorService.postErrorMessage(err);
            this.LoginForm.reset();
          }
        );
    }
  }
  ngOnDestroy(): void {
    if (this.LoginSubscription) {
      this.LoginSubscription.unsubscribe();
    }
  }
  signUp() {
    this.router.navigate(['/register']);
  }
}
