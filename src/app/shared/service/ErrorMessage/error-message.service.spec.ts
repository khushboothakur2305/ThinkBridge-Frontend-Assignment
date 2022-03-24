import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { ErrorMessageService } from './error-message.service';
class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({}),
    };
  }
}
describe('ErrorMessageService', () => {
  let service: ErrorMessageService;
  let snackbar: MatSnackBar;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useClass: MatSnackBarStub }],
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(ErrorMessageService);
    snackbar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should post errorMessage with 400 status', () => {
    let err = {
      status: 400,
      error: {
        test: 'Invalid',
      },
    };
    spyOn(snackbar, 'open').and.callThrough();
    service.postErrorMessage(err);
    expect(snackbar.open).toHaveBeenCalled();
  });

  it('should post errorMessage with detail', () => {
    let err = {
      error: {
        detail: 'Invalid',
      },
    };
    spyOn(snackbar, 'open').and.callThrough();
    service.postErrorMessage(err);
    expect(snackbar.open).toHaveBeenCalled();
  });
  it('should post errorMessage else ', () => {
    let err = {
      error: {
        messga: 'Invalid',
      },
    };
    spyOn(snackbar, 'open').and.callThrough();
    service.postErrorMessage(err);
    expect(snackbar.open).toHaveBeenCalled();
  });
});
