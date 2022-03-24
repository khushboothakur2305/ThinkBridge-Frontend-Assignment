import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BooksAddEditComponent } from './components/books-add-edit/books-add-edit.component';
import { BooksDeleteConfirmationComponent } from './components/books-delete-confirmation/books-delete-confirmation.component';
import { BooksListComponent } from './components/books-list/books-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'list',
        component: BooksListComponent,
      },
      {
        path: 'add',
        component: BooksAddEditComponent,
      },
      {
        path: 'edit/:id',
        component: BooksAddEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
