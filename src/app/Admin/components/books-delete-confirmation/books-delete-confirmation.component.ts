import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-books-delete-confirmation',
  templateUrl: './books-delete-confirmation.component.html',
  styleUrls: ['./books-delete-confirmation.component.scss'],
})
export class BooksDeleteConfirmationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BooksDeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}
  cancel() {
    this.dialogRef.close();
  }
  deleteConfirm() {
    this.dialogRef.close(true);
  }
}
