import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/service/Alert/alert.service';
import { ErrorMessageService } from 'src/app/shared/service/ErrorMessage/error-message.service';
import { UserDataService } from 'src/app/shared/service/userData/user-data.service';
import { AuthService } from '../../service/auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let authService: AuthService;
  let alertService: AlertService;
  let errorService: ErrorMessageService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    alertService = TestBed.inject(AlertService);
    errorService = TestBed.inject(ErrorMessageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should register', () => {
    component.registerForm.patchValue({
      email: 'khushboothakur@gmail.com',
      password: 'Admin@123',
      name: 'Khushboo Thakur',
    });
    let response = {
      message: 'User Created Successfully',
      data: null,
    };
    if (component.registerForm.valid) {
      spyOn(authService, 'registerAdmin').and.returnValue(of(response));
      component.signUp();
      alertService.showSnackBar(response.message, true);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    }
  });
  it('should register invalid', () => {
    component.registerForm.patchValue({
      email: '',
      password: '',
      name: '',
    });
    let response = {
      message:
        'Users validation failed: name: Path `name` is required., email: Path `email` is required., password: Path `password` is required.',
    };
    if (component.registerForm.valid) {
      spyOn(authService, 'registerAdmin').and.returnValue(of(response));
      component.signUp();
      errorService.postErrorMessage(response);
      component.registerForm.reset();
    }
  });
  it('RegisterSubscription with value', () => {
    component.RegisterSubscription = new Subscription();
    component.ngOnDestroy();
  });
  it('RegisterSubscription null', () => {
    component.RegisterSubscription = null;
    component.ngOnDestroy();
  });
  it('login', () => {
    component.login();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
