import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/Alert/alert.service';
import { UserDataService } from '../../service/userData/user-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  userData;
  constructor(
    private userDataService: UserDataService,
    private alertService: AlertService
  ) {}
  userDataSubscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.userDataSubscription = this.userDataService.userData.subscribe(
      (userData) => {
        this.userData = userData;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  logout() {
    this.userDataService.logout();
    this.alertService.showSnackBar('Logged out successfully !', true);
  }
}
