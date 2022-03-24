import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';

describe('UserDataService', () => {
  let service: UserDataService;
  let mockUserData = {
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNiODFjODUzMjNjYWE4NWI1YjQ4ZDciLCJpYXQiOjE2NDgxMjU3OTZ9.B5p1A_XATP6_k1mTUJlq1PHuaODzcyFiXsMpqftZ4vU',
    email: 'khushboothakur2305@gmail.com',
    name: 'Khushboo Thakur ',
    __v: 0,
    _id: '623b81c85323caa85b5b48d7',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should check behaviour subject data', () => {
    service.setUserData(mockUserData);
    expect(service.userData.value).toEqual(mockUserData);
  });
  it('should getUserData', () => {
    service.getUserData();
    let localStore = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    expect(service.userData.value).toEqual(null);
  });
  it('should setUserData', () => {
    service.setUserData({});
    let localStore = {};
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    expect(service.userData.value).toEqual({});
  });
  it('should check logout', () => {
    service.logout();
    let localStore = {};
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
    expect(service.userData.value).toEqual(null);
  });
});
