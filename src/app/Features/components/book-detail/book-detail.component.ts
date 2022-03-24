import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { exhaustMap, tap } from 'rxjs/operators';
import { BookDetailsService } from './service/book-details.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  constructor(
    private activatedRouter: ActivatedRoute,
    private bookDetailsService: BookDetailsService
  ) {}
  show = false;
  bookData;
  paramsSubscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRouter?.paramMap
      ?.pipe(
        exhaustMap((params: any) => {
          if (params?.params?.id) {
            return this.bookDetailsService.getProductById(params.params.id);
          } else {
            of([]);
          }
        }),
        tap((bookData: any) => {
          if (bookData) {
            this.bookData = bookData?.data;
          } else {
            this.bookData = null;
          }
        })
      )
      .subscribe();
  }
  errorImage(event, index) {
    this.bookData.image =
      'https://du5jhqks4kn0y.cloudfront.net/5d7889182ff8f000702bcb08/b287c465-139b-b166-5845-8df58d9b2af8.jpg';
  }
}
