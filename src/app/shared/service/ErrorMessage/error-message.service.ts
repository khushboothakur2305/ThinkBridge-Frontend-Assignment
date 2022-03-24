import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  constructor(private snackbar: MatSnackBar) {}

  postErrorMessage(err) {
    console.error(err);
    if (err?.status == 400) {
      Object.keys(err.error).forEach((ele) => {
        this.snackbar.open(err.error[ele], 'Error', {
          duration: 3000,
        });
      });
    }
    if (err.error.detail) {
      this.snackbar.open(err.error.detail, 'Error', {
        duration: 3000,
      });
    } else {
      this.snackbar.open('An error occurred accessing db', 'Error', {
        duration: 3000,
      });
    }
  }
}
