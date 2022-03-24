import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  registerAdmin(userData) {
    return this.http.post(`${environment.baseUrl}/sign-up`, userData);
  }
  loginUser(userData) {
    return this.http.post(`${environment.baseUrl}/login`, userData);
  }
}
