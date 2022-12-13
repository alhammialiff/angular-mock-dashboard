import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  @Input() deviceXs: boolean;

  constructor() { }

  ngOnInit() {
  }

}
