import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAddEditComponent } from './books-add-edit.component';

describe('BooksAddEditComponent', () => {
  let component: BooksAddEditComponent;
  let fixture: ComponentFixture<BooksAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
