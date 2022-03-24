import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegisterComponent } from './Auth/components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteConfirmationComponent } from './shared/components/delete-confirmation/delete-confirmation.component';
import { HomeComponent } from './Features/components/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BookDetailComponent } from './Features/components/book-detail/book-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DeleteConfirmationComponent,
    HomeComponent,
    NavbarComponent,
    BookDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
