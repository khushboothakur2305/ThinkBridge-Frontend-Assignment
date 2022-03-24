import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { HomeService } from 'src/app/Features/components/home/service/home.service';
import { AdminService } from '../../Service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { BooksDeleteConfirmationComponent } from '../books-delete-confirmation/books-delete-confirmation.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/service/Alert/alert.service';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  constructor(
    private adminService: AdminService,
    private homeService: HomeService,
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService
  ) {}
  displayedColumns: string[] = [
    'index',
    'image',
    'book_name',
    'author',
    'editor',
    'books_decription',
    'marked_price',
    'selling_price',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<any>;
  booklist$: Observable<any> = new Observable();
  bookData;
  ngOnDestroy(): void {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
  deleteSubscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.fetchBooksList();
  }
  addBook() {
    this.router.navigate(['/dashboard/add']);
  }
  edit(data) {
    this.router.navigate([`/dashboard/edit/${data?._id}`]);
  }
  fetchBooksList() {
    this.booklist$ = this.homeService.getProducts().pipe(
      pluck('data'),
      tap((data) => {
        this.bookData = data;
        this.dataSource = new MatTableDataSource(data);
      })
    );
  }
  onDelete(data) {
    const dialogRef = this.dialog.open(BooksDeleteConfirmationComponent, {
      data: data,
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSubscription = this.adminService
          .deleteProduct(data?._id)
          .pipe(
            tap((bookData: any) => {
              this.alertService.showSnackBar(bookData?.message, true);
              this.fetchBooksList();
            })
          )
          .subscribe();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  errorImage(event, index) {
    this.bookData[index].image =
      'https://du5jhqks4kn0y.cloudfront.net/5d7889182ff8f000702bcb08/b287c465-139b-b166-5845-8df58d9b2af8.jpg';
  }
}
