import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { UserDataService } from './shared/service/userData/user-data.service';

describe('AppComponent', () => {
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let userDataService: UserDataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: Router, useValue: routerSpy }, UserDataService],
    }).compileComponents();
    userDataService = TestBed.inject(UserDataService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });
  it(`should get userData`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let userData = JSON.stringify({
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNiODFjODUzMjNjYWE4NWI1YjQ4ZDciLCJpYXQiOjE2NDgxMjU3OTZ9.B5p1A_XATP6_k1mTUJlq1PHuaODzcyFiXsMpqftZ4vU',
      email: 'khushboothakur2305@gmail.com',
      name: 'Khushboo Thakur ',
      __v: 0,
      _id: '623b81c85323caa85b5b48d7',
    });
    localStorage.setItem('userData', userData);
    app.ngOnInit();
    app.userData = userDataService.getUserData();
    expect(app.userData._id).toEqual('623b81c85323caa85b5b48d7');
    if (app.userData) {
      userDataService.setUserData(app.userData);
    }
  });

  it(`should get userData null`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let userData = null;
    localStorage.setItem('userData', userData);
    app.ngOnInit();
    app.userData = userDataService.getUserData();
    expect(app.userData).toEqual(null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'], {
      replaceUrl: true,
    });
  });
});
