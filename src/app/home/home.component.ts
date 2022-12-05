import { Component, OnInit, Inject } from '@angular/core';
import { Spending } from '../shared/spending';
import { SpendingService } from '../services/spending.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  spending: Spending[];

  constructor(private spendingService: SpendingService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.spendingService.getSpending()
      .subscribe((spending)=> this.spending = spending);
  }

}
