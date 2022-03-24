import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { exhaustMap, tap } from 'rxjs/operators';

import { BookDetailComponent } from './book-detail.component';
import { BookDetailsService } from './service/book-details.service';

describe('BookDetailComponent', () => {
  const fakeActivatedRoute = {
    snapshot: { params: {} },
  } as ActivatedRoute;

  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let bookDetailsService: BookDetailsService;
  let activatedRouter: ActivatedRoute;
  let Mockdata = {
    _id: '623baf087fe00f557d61f195',
    book_name: 'Atomic Habits',
    books_decription:
      "<p><strong>THE PHENOMENAL INTERNATIONAL BESTSELLER: 1 MILLION COPIES SOLD</strong><br><br><strong>Transform your life with tiny changes in behaviour, starting </strong><i><strong>now.</strong></i><br><br>People think that when you want to change your life, you need to think big. But world-renowned habits expert James Clear has discovered another way. He knows that real change comes from the compound effect of hundreds of small decisions: doing two push-ups a day, waking up five minutes early, or holding a single short phone call.<br><br><strong>He calls them atomic habits.</strong><br><br>In this ground-breaking book, Clears reveals exactly how these minuscule changes can grow into such life-altering outcomes. He uncovers a handful of simple life hacks (the forgotten art of Habit Stacking, the unexpected power of the Two Minute Rule, or the trick to entering the Goldilocks Zone), and delves into cutting-edge psychology and neuroscience to explain why they matter. Along the way, he tells inspiring stories of Olympic gold medalists, leading CEOs, and distinguished scientists who have used the science of tiny habits to stay productive, motivated, and happy.<br><br><strong>These small changes will have a revolutionary effect on your career, your relationships, and your life.</strong><br>________________________________<br><strong>A </strong><i><strong>NEW YORK TIMES</strong></i><strong> AND </strong><i><strong>SUNDAY TIMES</strong></i><strong> BESTSELLER</strong><br><br><strong>'A supremely practical and useful book.' </strong>Mark Manson, author of <i>The Subtle Art of Not Giving A F*ck</i><br><br><strong>'James Clear has spent years honing the art and studying the science of habits. This engaging, hands-on book is the guide you need to break bad routines and make good ones.' </strong>Adam Grant, author of <i>Originals</i><br>&nbsp;</p>",
    marked_price: 200,
    selling_price: 300,
    image: 'https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg',
    author: 'James Clear',
    editor: 'Mark Manson',
    __v: 0,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '623baf087fe00f557d61f195' })),
          },
        },
      ],
      imports: [HttpClientModule],
    }).compileComponents();
    bookDetailsService = TestBed.inject(BookDetailsService);
    activatedRouter = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    component.bookData = Mockdata;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check ngOnInit', () => {
    component.ngOnInit();
    activatedRouter?.paramMap
      ?.pipe(
        exhaustMap((params: any) => {
          if (params?.params?.id) {
            expect(params?.params?.id).toEqual('623baf087fe00f557d61f195');
            return bookDetailsService.getProductById(params.params.id);
          } else {
            of([]);
          }
        }),
        tap((bookData: any) => {
          if (bookData) {
            component.bookData = bookData?.data;
          } else {
            component.bookData = null;
          }
        })
      )
      .subscribe();
  });
  it('should check error message', () => {
    component.errorImage('', 0);
    expect(component.bookData.image).toEqual(
      'https://du5jhqks4kn0y.cloudfront.net/5d7889182ff8f000702bcb08/b287c465-139b-b166-5845-8df58d9b2af8.jpg'
    );
  });
});
