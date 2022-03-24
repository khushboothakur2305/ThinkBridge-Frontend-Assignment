import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BooksAddEditComponent } from './components/books-add-edit/books-add-edit.component';
import { BooksDeleteConfirmationComponent } from './components/books-delete-confirmation/books-delete-confirmation.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { AdminService } from './Service/admin.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
  declarations: [
    AdminComponent,
    BooksAddEditComponent,
    BooksDeleteConfirmationComponent,
    BooksListComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CKEditorModule,
    FormsModule,
  ],
  providers: [AdminService],
})
export class AdminModule {}
