import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { UserDataService } from 'src/app/shared/service/userData/user-data.service';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let userDataService: UserDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService, AdminService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AdminService);
    userDataService = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should add', () => {
    service.addProduct({
      author: 'James Clear',
      book_name: 'Atomic Habits',
      books_decription:
        "<p><strong>THE PHENOMENAL INTERNATIONAL BESTSELLER: 1 MILLION COPIES SOLD</strong><br><br><strong>Transform your life with tiny changes in behaviour, starting </strong><i><strong>now.</strong></i><br><br>People think that when you want to change your life, you need to think big. But world-renowned habits expert James Clear has discovered another way. He knows that real change comes from the compound effect of hundreds of small decisions: doing two push-ups a day, waking up five minutes early, or holding a single short phone call.<br><br><strong>He calls them atomic habits.</strong><br><br>In this ground-breaking book, Clears reveals exactly how these minuscule changes can grow into such life-altering outcomes. He uncovers a handful of simple life hacks (the forgotten art of Habit Stacking, the unexpected power of the Two Minute Rule, or the trick to entering the Goldilocks Zone), and delves into cutting-edge psychology and neuroscience to explain why they matter. Along the way, he tells inspiring stories of Olympic gold medalists, leading CEOs, and distinguished scientists who have used the science of tiny habits to stay productive, motivated, and happy.<br><br><strong>These small changes will have a revolutionary effect on your career, your relationships, and your life.</strong><br>________________________________<br><strong>A </strong><i><strong>NEW YORK TIMES</strong></i><strong> AND </strong><i><strong>SUNDAY TIMES</strong></i><strong> BESTSELLER</strong><br><br><strong>'A supremely practical and useful book.' </strong>Mark Manson, author of <i>The Subtle Art of Not Giving A F*ck</i><br><br>&nbsp;</p>",
      editor: 'Mark Manson',
      image: 'https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg',
      marked_price: 200,
      selling_price: 300,
    });
  });
  it('should delete', () => {
    service.deleteProduct('');
  });
  it('should get', () => {
    service.editProduct(
      {
        author: 'James Clear',
        book_name: 'Atomic Habits',
        books_decription:
          "<p><strong>THE PHENOMENAL INTERNATIONAL BESTSELLER: 1 MILLION COPIES SOLD</strong><br><br><strong>Transform your life with tiny changes in behaviour, starting </strong><i><strong>now.</strong></i><br><br>People think that when you want to change your life, you need to think big. But world-renowned habits expert James Clear has discovered another way. He knows that real change comes from the compound effect of hundreds of small decisions: doing two push-ups a day, waking up five minutes early, or holding a single short phone call.<br><br><strong>He calls them atomic habits.</strong><br><br>In this ground-breaking book, Clears reveals exactly how these minuscule changes can grow into such life-altering outcomes. He uncovers a handful of simple life hacks (the forgotten art of Habit Stacking, the unexpected power of the Two Minute Rule, or the trick to entering the Goldilocks Zone), and delves into cutting-edge psychology and neuroscience to explain why they matter. Along the way, he tells inspiring stories of Olympic gold medalists, leading CEOs, and distinguished scientists who have used the science of tiny habits to stay productive, motivated, and happy.<br><br><strong>These small changes will have a revolutionary effect on your career, your relationships, and your life.</strong><br>________________________________<br><strong>A </strong><i><strong>NEW YORK TIMES</strong></i><strong> AND </strong><i><strong>SUNDAY TIMES</strong></i><strong> BESTSELLER</strong><br><br><strong>'A supremely practical and useful book.' </strong>Mark Manson, author of <i>The Subtle Art of Not Giving A F*ck</i><br><br>&nbsp;</p>",
        editor: 'Mark Manson',
        image: 'https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg',
        marked_price: 200,
        selling_price: 300,
      },
      '623baf087fe00f557d61f195'
    );
  });
  it('should ', () => {
    service.getProductById('623baf087fe00f557d61f195');
  });
});
