import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/service/Alert/alert.service';
import { passwordCheck } from 'src/app/shared/Validators/passwordValidator';
import { AuthService } from '../../service/auth.service';
import { ErrorMessageService } from '../../../shared/service/ErrorMessage/error-message.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  RegisterSubscription: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private errorService: ErrorMessageService
  ) {}
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {}
  signUp() {
    console.log(this.registerForm);
    debugger;
    if (this.registerForm.valid) {
      this.RegisterSubscription = this.authService
        .registerAdmin(this.registerForm.value)
        .subscribe(
          (res: any) => {
            this.alertService.showSnackBar(res?.message, true);
            this.registerForm.reset();
            this.router.navigate(['/login']);
          },
          (err) => {
            this.errorService.postErrorMessage(err);
            this.registerForm.reset();
          }
        );
    }
  }
  login() {
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    if (this.RegisterSubscription) {
      this.RegisterSubscription.unsubscribe();
    }
  }
}
