import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDeleteConfirmationComponent } from './books-delete-confirmation.component';

describe('BooksDeleteConfirmationComponent', () => {
  let component: BooksDeleteConfirmationComponent;
  let fixture: ComponentFixture<BooksDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
