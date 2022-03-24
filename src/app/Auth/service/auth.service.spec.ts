import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be registered', () => {
    service.registerAdmin({
      email: 'khushboothakur@gmail.com',
      password: 'Khush@123',
      name: 'khushboo Thakur',
    });
  });
  it('should be loggedIn', () => {
    service.loginUser({
      email: 'khushboothakur@gmail.com',
      password: 'Khush@123',
    });
  });
});
