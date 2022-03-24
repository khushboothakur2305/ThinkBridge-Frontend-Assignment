import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataService } from 'src/app/shared/service/userData/user-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookDetailsService {
  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) {}
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
