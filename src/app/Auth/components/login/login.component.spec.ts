import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/service/Alert/alert.service';
import { ErrorMessageService } from 'src/app/shared/service/ErrorMessage/error-message.service';
import { UserDataService } from 'src/app/shared/service/userData/user-data.service';
import { AuthService } from '../../service/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let authService: AuthService;
  let userDataService: UserDataService;
  let alertService: AlertService;
  let errorService: ErrorMessageService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        AlertService,
        UserDataService,
        ErrorMessageService,
      ],
      imports: [MatSnackBarModule, HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    userDataService = TestBed.inject(UserDataService);
    alertService = TestBed.inject(AlertService);
    errorService = TestBed.inject(ErrorMessageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should login', () => {
    component.LoginForm.patchValue({
      email: 'khushboothakur235@gmail.com',
      password: 'Admin@123',
    });
    let response = {
      message: 'Login Successfully',
      data: {
        _id: '623c2360c294d3cd58ee50d9',
        name: 'Khushboo',
        email: 'khushboothakur235@gmail.com',
        __v: 0,
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNiODFjODUzMjNjYWE4NWI1YjQ4ZDciLCJpYXQiOjE2NDgxMjU3OTZ9.B5p1A_XATP6_k1mTUJlq1PHuaODzcyFiXsMpqftZ4vU',
      },
    };
    if (component.LoginForm.valid) {
      spyOn(authService, 'loginUser').and.returnValue(of(response));
      component.Login();
      userDataService.setUserData(response.data);
      alertService.showSnackBar(response.message, true);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard/list']);
    }
  });
  it('should login invalid', () => {
    component.LoginForm.patchValue({
      email: '',
      password: '',
    });
    let response = {
      message: 'User not Found',
    };
    if (component.LoginForm.valid) {
      spyOn(authService, 'loginUser').and.returnValue(of(response));
      component.Login();
      errorService.postErrorMessage(response);
      component.LoginForm.reset();
    }
  });
  it('LoginSubscription with value', () => {
    component.LoginSubscription = new Subscription();
    component.ngOnDestroy();
  });
  it('LoginSubscription null', () => {
    component.LoginSubscription = null;
    component.ngOnDestroy();
  });
  it('signup', () => {
    component.signUp();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/register']);
  });
});
