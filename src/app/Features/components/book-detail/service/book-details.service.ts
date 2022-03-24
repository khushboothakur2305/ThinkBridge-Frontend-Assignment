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
    return this.http.get(`${environment.baseUrl}/books/${id}`);
  }
}
