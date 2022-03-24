import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { exhaustMap, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/service/Alert/alert.service';
import { AdminService } from '../../Service/admin.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-books-add-edit',
  templateUrl: './books-add-edit.component.html',
  styleUrls: ['./books-add-edit.component.scss'],
})
export class BooksAddEditComponent implements OnInit, OnDestroy {
  public Editor = ClassicEditor;
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}
  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  }
  imageUrl = new RegExp(
    /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  );
  bookForm: FormGroup = new FormGroup({
    book_name: new FormControl(``, [Validators.required]),
    books_decription: new FormControl(``, [Validators.required]),
    marked_price: new FormControl(``, [Validators.required]),
    selling_price: new FormControl(``, [Validators.required]),
    image: new FormControl(``, [
      Validators.required,
      Validators.pattern(this.imageUrl),
    ]),
    author: new FormControl(``, [Validators.required]),
    editor: new FormControl(``, [Validators.required]),
  });
  paramsSubscription: Subscription = new Subscription();
  submitSubscription: Subscription = new Subscription();
  editMode: boolean = false;
  bookId;
  showEditor = false;
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute?.paramMap
      ?.pipe(
        exhaustMap((params: any) => {
          if (params?.params?.id) {
            return this.adminService.getProductById(params.params.id);
          } else {
            of([]);
          }
        }),
        tap((bookData: any) => {
          if (bookData) {
            this.editMode = true;
            this.bookId = bookData?.data?._id;
            this.bookForm.patchValue({
              author: bookData?.data?.author,
              book_name: bookData?.data?.book_name,
              books_decription: bookData?.data?.books_decription,
              editor: bookData?.data?.editor,
              image: bookData?.data?.image,
              marked_price: bookData?.data?.marked_price,
              selling_price: bookData?.data?.selling_price,
            });
            this.showEditor = true;
          } else {
            this.editMode = false;
            this.showEditor = true;
          }
        })
      )
      .subscribe();
  }
  onSubmit() {
    if (this.editMode) {
      this.submitSubscription = this.adminService
        .editProduct(this.bookForm.value, this.bookId)
        .pipe(
          tap((editData: any) => {
            this.alertService.showSnackBar(editData?.message, true);
            this.cancel();
          })
        )
        .subscribe();
    } else {
      this.submitSubscription = this.adminService
        .addProduct(this.bookForm.value)
        .pipe(
          tap((addData: any) => {
            this.alertService.showSnackBar(addData?.message, true);
            this.cancel();
          })
        )
        .subscribe();
    }
  }
  cancel() {
    this.router.navigate(['/dashboard/list']);
  }
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.bookForm.controls['books_decription'].setValue(data);
    this.bookForm.controls['books_decription'].markAsDirty();
    this.bookForm.controls['books_decription'].markAsTouched();
  }
}
