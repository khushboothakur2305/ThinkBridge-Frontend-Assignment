import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { AlertService } from './alert.service';

class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({}),
    };
  }
}
describe('AlertService', () => {
  let service: AlertService;
  let snackbar: MatSnackBar;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useClass: MatSnackBarStub }],
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(AlertService);
    snackbar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should showSnackBar true ', () => {
    spyOn(snackbar, 'open').and.callThrough();
    service.showSnackBar('message', true);
    expect(snackbar.open).toHaveBeenCalled();
  });
  it('should showSnackBar false ', () => {
    spyOn(snackbar, 'open').and.callThrough();
    service.showSnackBar('message', false);
    expect(snackbar.open).toHaveBeenCalled();
  });
});
