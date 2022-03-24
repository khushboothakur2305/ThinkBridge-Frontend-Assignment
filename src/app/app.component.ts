import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserDataService } from './shared/service/userData/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}
  userData;
  ngOnInit(): void {
    this.userData = this.userDataService.getUserData();
    if (this.userData) {
      this.userDataService.setUserData(this.userData);
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }
}
