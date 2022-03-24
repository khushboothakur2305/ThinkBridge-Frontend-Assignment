import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataService } from 'src/app/shared/service/userData/user-data.service';
import { environment } from 'src/environments/environment';
@Injectable()
export class AdminService {
  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) {}
  addProduct(data) {
    const token = this.userDataService.userData.value;
    const header = new HttpHeaders({
      Authorization: `Bearer ${token.access_token}`,
    });
    return this.http.post(`${environment.baseUrl}/books`, data, {
      headers: header,
    });
  }
  editProduct(data, id: string) {
    const token = this.userDataService.userData.value;
    const header = new HttpHeaders({
      Authorization: `Bearer ${token.access_token}`,
    });
    return this.http.patch(`${environment.baseUrl}/books/${id}`, data, {
      headers: header,
    });
  }
  deleteProduct(id: string) {
    const token = this.userDataService.userData.value;
    const header = new HttpHeaders({
      Authorization: `Bearer ${token.access_token}`,
    });
    return this.http.delete(`${environment.baseUrl}/books/${id}`, {
      headers: header,
    });
  }
  getProductById(id: string) {
    const token = this.userDataService.userData.value;
    const header = new HttpHeaders({
      Authorization: `Bearer ${token.access_token}`,
    });
    return this.http.get(`${environment.baseUrl}/books/${id}`, {
      headers: header,
    });
  }
}
