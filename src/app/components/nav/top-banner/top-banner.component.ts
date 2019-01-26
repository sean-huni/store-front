import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HomeComponent} from '../../home/home.component';
import {AccountComponent} from '../../account/account.component';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.css']
})
export class TopBannerComponent implements OnInit {
  private pageTitle: string;

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    const activeComponent = this.activatedRoute.component;
    switch (activeComponent) {
      case HomeComponent:
        this.pageTitle = 'Home';
        break;
      case AccountComponent:
        this.pageTitle = 'My Account';
        break;
      default :
        // Nothing happens...
        break;
    }
  }
}
