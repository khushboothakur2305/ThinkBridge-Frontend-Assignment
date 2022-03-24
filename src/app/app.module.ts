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
import { HomeComponent } from './Features/components/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BookDetailComponent } from './Features/components/book-detail/book-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { AboutUsComponent } from './Features/components/about-us/about-us.component';
import { FooterComponent } from './shared/components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutUsComponent,
    NavbarComponent,
    BookDetailComponent,
    FooterComponent,
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
    MatIconModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
