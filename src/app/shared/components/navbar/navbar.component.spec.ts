import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from '../../service/Alert/alert.service';
import { UserDataService } from '../../service/userData/user-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let userDataService: UserDataService;
  let alertService: AlertService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [UserDataService, AlertService],
      imports: [MatSnackBarModule, BrowserAnimationsModule],
    }).compileComponents();
    userDataService = TestBed.inject(UserDataService);
    alertService = TestBed.inject(AlertService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnDestroy', () => {
    component.userDataSubscription = new Subscription();
    component.ngOnDestroy();
  });
  it('ngOnDestroy value', () => {
    component.userDataSubscription = null;
    component.ngOnDestroy();
    component.ngOnDestroy();
  });
  it('logout', () => {
    component.logout();
  });
});
