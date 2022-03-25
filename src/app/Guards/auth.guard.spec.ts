import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from '../shared/service/userData/user-data.service';

import { AuthGuard } from './auth.guard';
class MockUserData {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
}
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userDataService: UserDataService;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/dashboard' };
  let routerMock = { navigate: jasmine.createSpy('navigate') };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provider: UserDataService, useClass: MockUserData },
        { provide: Router, useValue: routerMock },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    userDataService = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should be created', () => {
    userDataService.userData.next({
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNiODFjODUzMjNjYWE4NWI1YjQ4ZDciLCJpYXQiOjE2NDgxMjU3OTZ9.B5p1A_XATP6_k1mTUJlq1PHuaODzcyFiXsMpqftZ4vU',
      email: 'khushboothakur2305@gmail.com',
      name: 'Khushboo Thakur ',
      __v: 0,
      _id: '623b81c85323caa85b5b48d7',
    });
    guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{
      url: 'dashboard',
    });
    userDataService.userData.pipe(
      map((userData) => {
        if (userData) {
          return true;
        } else {
          return false;
        }
      })
    );
  });
  it('should be created', () => {
    userDataService.setUserData(null);
    guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{
      url: 'dashboard',
    });
  });
});
