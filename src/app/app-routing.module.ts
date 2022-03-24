import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Features/components/home/home.component';
import { AboutUsComponent } from './Features/components/about-us/about-us.component';
import { PrivacyPolicyComponent } from './Features/components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './Features/components/terms-and-conditions/terms-and-conditions.component';
import { AuthGuard } from './Guards/auth.guard';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegisterComponent } from './Auth/components/register/register.component';
import { BookDetailComponent } from './Features/components/book-detail/book-detail.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'terms-and-condition',
    component: TermsAndConditionsComponent,
  },
  {
    path: 'details/:id',
    component: BookDetailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./Admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
