import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { HomeService } from './service/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService, private router: Router) {}
  book$: Observable<any> = new Observable();
  booksData;
  ngOnInit(): void {
    this.book$ = this.homeService.getProducts().pipe(
      pluck('data'),
      tap((data) => {
        this.booksData = data;
      })
    );
  }
  errorImage(event, index) {
    this.booksData[index].image =
      'https://du5jhqks4kn0y.cloudfront.net/5d7889182ff8f000702bcb08/b287c465-139b-b166-5845-8df58d9b2af8.jpg';
  }
  viewDetails(id: string) {
    this.router.navigate([`/details/${id}`]);
  }
}
