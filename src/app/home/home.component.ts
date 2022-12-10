import { Component, OnInit, Inject } from '@angular/core';

import { Spending } from '../shared/spending';
import { Utilities } from '../shared/utilities';

import { SpendingService } from '../services/spending.service';
import { UtilitiesService } from '../services/utilities.service';
import { SidenavToggleService } from '../services/sidenav-toggle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  spending: Spending[];
  utilities: Utilities[];

  constructor(private spendingService: SpendingService,
    private utilitiesService: UtilitiesService,
    private sidenavToggleService: SidenavToggleService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    this.spendingService.getSpending()
      .subscribe((spending)=> this.spending = spending);

    this.utilitiesService.getUtilities()
      .subscribe((utilities)=> this.utilities = utilities);
    
  }

  toggleSidenav(){
    this.sidenavToggleService.toggleSidenav();
  }

}
