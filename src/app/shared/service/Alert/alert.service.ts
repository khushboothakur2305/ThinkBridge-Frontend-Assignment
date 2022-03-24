import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private sankBar: MatSnackBar) {}
  showSnackBar(message, status?) {
    if (status) {
      this.sankBar.open(message, null, {
        duration: 3000,
        panelClass: ['successSnackBar'],
      });
    } else {
      this.sankBar.open(message, null, {
        duration: 3000,
        panelClass: ['dangerSnackBar'],
      });
    }
  }
}
