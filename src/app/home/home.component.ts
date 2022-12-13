import { Component, OnInit, Inject, Input } from '@angular/core';

import { Spending } from '../shared/spending';
import { Utilities } from '../shared/utilities';

import { SpendingService } from '../services/spending.service';
import { UtilitiesService } from '../services/utilities.service';
import { SidenavToggleService } from '../services/sidenav-toggle.service';
import { MediaChange, MediaService } from '@angular/flex-layout';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  spending: Spending[];
  utilities: Utilities[];
  deviceXs: boolean;

  constructor(private spendingService: SpendingService,
    private utilitiesService: UtilitiesService,
    private sidenavToggleService: SidenavToggleService,
    private mediaService: MediaService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    // Get Spending data
    this.spendingService.getSpending()
      .subscribe((spending)=> this.spending = spending);

    // Get Utilities data
    this.utilitiesService.getUtilities()
      .subscribe((utilities)=> this.utilities = utilities);

    // Media query observer to manipulate template elements on screen size change
    this.mediaService.subscribe((res: MediaChange)=> {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs"? true: false;
    })
    
  }

  toggleSidenav(){
    this.sidenavToggleService.toggleSidenav();
  }

}
