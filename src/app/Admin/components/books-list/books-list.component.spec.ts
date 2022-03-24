import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { HomeService } from 'src/app/Features/components/home/service/home.service';
import { AlertService } from 'src/app/shared/service/Alert/alert.service';
import { AdminService } from '../../Service/admin.service';
import { BooksDeleteConfirmationComponent } from '../books-delete-confirmation/books-delete-confirmation.component';

import { BooksListComponent } from './books-list.component';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;
  let adminService: AdminService;
  let dialog: MatDialog;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of(true),
    close: true,
  });
  let Mockdata = [
    {
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
    },
    {
      _id: '623bb1b07fe00f557d61f198',
      book_name: 'The Pshychology of Money',
      books_decription:
        '<p>TIMELESS LESSONS ON WEALTH, GREED, AND HAPPINESS<br><br>Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people.<br><br>How to manage money, invest it, and make business decisions are typically considered to involve a lot of mathematical calculations, where data and formulae tell us exactly what to do. But in the real world, people don’t make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your unique view of the world, ego, pride, marketing, and odd incentives are scrambled together.<br><br>In The Psychology of Money, the author shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life’s most important matters.<br><br>MORGAN HOUSEL is a partner at The Collaborative Fund and a former columnist at The Motley Fool and The Wall Street Journal. He is a two-time winner of the Best in Business Award from the Society of American Business Editors and Writers, winner of the New York Times Sidney Award, and a two-time finalist for the Gerald Loeb Award for distinguished Business and Financial Journalism.<br><br>“Everyone should own a copy.”<br>—JAMES CLEAR<br>New York Times Bestselling Author of Atomic Habits<br><br>“Few people write about finance with the graceful clarity of Morgan Housel.”<br>—DANIEL H. PINK<br>#1 New York Times Bestselling Author of When, To Sell is Human, and Drive<br><br>“Housel’s observations often hit the daily double: they say things that haven’t been said before, and they make sense.”<br>—HOWARD MARKS<br>Co-founder and Co-chairman, Oaktree Capital Management<br><br>“That rare writer who can translate complex concepts into gripping, easy-to-digest narrative.”<br>—ANNIE DUKE<br>Author, Thinking in Bets</p>',
      marked_price: 700,
      selling_price: 500,
      image: 'https://images-na.ssl-images-amazon.com/images/I/81Lb75rUhLL.jpg',
      author: 'Morgan Housel',
      editor: 'Jason zweig',
      __v: 0,
    },
    {
      _id: '623bf8989f6653655e1a0ab5',
      book_name: 'The Richest Man in Babylon',
      books_decription:
        '<p>If you have a lean purse and are looking for financial wisdom, you’ve picked the perfect book! <strong>“A PART OF ALL YOU EARN IS YOURS TO KEEP.”</strong> This beautiful leather-bound edition of Clason’s classic bestseller The Richest Man in Babylon makes for a perfect addition to any library. From the importance of savings to the essentials on how to become wealthy, this collection of famous Babylonian parables imparts timeless financial wisdom. It insights on how to become wealthy and how to attract good luck and discusses the five laws of gold. A perfect guide to understanding finances and a powerhouse of time-tested principles to gain and retain personal wealth, The Richest Man in Babylon has been inspiring readers for generations.</p>',
      marked_price: 1000,
      selling_price: 800,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51ghDaX8lZL._SX460_BO1,204,203,200_.jpg',
      author: 'George S. Clason',
      editor: 'George S. Clason',
      __v: 0,
    },
    {
      _id: '623c1693c294d3cd58ee507c',
      book_name: 'How to Stop Worrying and Start Living',
      books_decription:
        '<p>DISCLAIMER: The content of this book is in the public domain, and in this edition we have included only the content which in our opinion was integral to the overall message that the book is seeking to convey. There is no content missing, and content that might be deemed as missing has been omitted by us as unnecessary.<br><br><br>This Book can change your future The common habit of worrying directly affects your work, money, personal relationships and family life. In this multi-million copy bestseller, the legendary self-help master, Dale Carnegie offers practical and easy to apply suggestions on how to lead a more positive and enjoyable life by breaking out of this destructive habit. You will learn: • Fundamental facts about worry and magic formula for solving worry situations • How to banish worry and anxiety to lead a fuller, more active and happier life • How to eliminate financial worries • How to eliminate financial worries • How to immediately reduce business worries by at least half • How to turn criticism to your advantage • Seven ways to cultivate a mental attitude that will bring you peace and happiness • Six ways to prevent fatigue and stress - and keep looking young • How to add one hour a day to your waking life... and much more! Illustrated with personal tips from those who have conquered worry to turn their lives around, this book will help you find yourself - reminding you that you are unique, and there is no one like you in this world.</p>',
      marked_price: 700,
      selling_price: 350,
      image: 'https://m.media-amazon.com/images/I/41VDS6f7C3L.jpg',
      author: 'Dale Carnegie',
      editor: 'Donna Dale Carnegie and Dorothy Carnegie ',
      __v: 0,
    },
  ];

  dialogRefSpyObj.componentInstance = { body: Mockdata[0] };
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksListComponent, BooksDeleteConfirmationComponent],
      imports: [
        MatDialogModule,
        HttpClientModule,
        BrowserDynamicTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        AdminService,
        HomeService,

        { provide: Router, useValue: routerSpy },
        AlertService,
      ],
    }).compileComponents();
    adminService = TestBed.inject(AdminService);
    dialog = TestBed.inject(MatDialog);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    component.bookData = Mockdata;
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(
      dialogRefSpyObj
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('deleteSubscription with value', () => {
    component.deleteSubscription = new Subscription();
    component.ngOnDestroy();
  });
  it('deleteSubscription null', () => {
    component.deleteSubscription = null;
    component.ngOnDestroy();
  });
  it('should add', () => {
    component.addBook();
    expect(routerSpy.navigate).toHaveBeenCalledWith([`/dashboard/add`]);
  });
  it('should edit', () => {
    let data = {
      _id: '623baf087fe00f557d61f195',
    };
    component.edit(data);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      `/dashboard/edit/${data?._id}`,
    ]);
  });
  it('should view detail', () => {
    let data = {
      _id: '623baf087fe00f557d61f195',
    };
    component.viewDetail(data._id);
    expect(routerSpy.navigate).toHaveBeenCalledWith([`details/${data?._id}`]);
  });
  it('should check error message', () => {
    component.errorImage('', 0);
    expect(component.bookData[0].image).toEqual(
      'https://du5jhqks4kn0y.cloudfront.net/5d7889182ff8f000702bcb08/b287c465-139b-b166-5845-8df58d9b2af8.jpg'
    );
  });
  it('should apply filter', () => {
    component.dataSource = new MatTableDataSource(Mockdata);
    component.applyFilter({ target: { value: 'test' } });
  });
});
