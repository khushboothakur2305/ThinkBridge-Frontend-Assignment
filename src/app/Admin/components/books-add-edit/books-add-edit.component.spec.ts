import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/service/Alert/alert.service';
import { AdminService } from '../../Service/admin.service';

import { BooksAddEditComponent } from './books-add-edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientModule } from '@angular/common/http';
import { of, Subscription } from 'rxjs';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserDataService } from 'src/app/shared/service/userData/user-data.service';
import { MatDialogModule } from '@angular/material/dialog';
import { exhaustMap, tap } from 'rxjs/operators';
describe('BooksAddEditComponent', () => {
  let component: BooksAddEditComponent;
  let fixture: ComponentFixture<BooksAddEditComponent>;
  let userDataService: UserDataService;
  let adminService: AdminService;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let alertService: AlertService;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksAddEditComponent],
      providers: [
        AdminService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '623baf087fe00f557d61f195' })),
          },
        },
        { provide: Router, useValue: routerSpy },
        AlertService,
        UserDataService,
      ],
      imports: [
        CKEditorModule,
        HttpClientModule,
        BrowserDynamicTestingModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
    }).compileComponents();
    adminService = TestBed.inject(AdminService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    alertService = TestBed.inject(AlertService);
    userDataService = TestBed.inject(UserDataService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnDestroy', () => {
    component.submitSubscription = new Subscription();
    component.paramsSubscription = new Subscription();
    component.ngOnDestroy();
  });
  it('ngOnDestroy value', () => {
    component.submitSubscription = null;
    component.paramsSubscription = null;
    component.ngOnDestroy();
  });
  it('should check ngOnInit', () => {
    component.ngOnInit();
    activatedRoute.paramMap
      .pipe(
        exhaustMap((params: any) => {
          if (params.params.id) {
            return adminService.getProductById(params.params.id);
          } else {
            of([]);
          }
        }),
        tap((bookData: any) => {
          if (bookData) {
            component.editMode = true;
            component.bookId = bookData.data._id;
            component.bookForm.patchValue({
              author: bookData.data.author,
              book_name: bookData.data.book_name,
              books_decription: bookData.data.books_decription,
              editor: bookData.data.editor,
              image: bookData.data.image,
              marked_price: bookData.data.marked_price,
              selling_price: bookData.data.selling_price,
            });
            component.showEditor = true;
          } else {
            component.editMode = false;
            component.showEditor = true;
          }
        })
      )
      .subscribe();
  });
  it('should cancel', () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith([`/dashboard/list`]);
  });
  it('should visit details', () => {
    component.onChange({
      editor: {
        getData: function () {
          return '<p>Hello</p>';
        },
      },
    });
    expect(component.bookForm.controls['books_decription'].dirty).toBeTrue();
    expect(component.bookForm.controls['books_decription'].touched).toBeTrue();
    expect(component.bookForm.controls['books_decription'].valid).toBeTrue();
  });
});
