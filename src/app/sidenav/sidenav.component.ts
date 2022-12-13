import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavToggleService } from '../services/sidenav-toggle.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() deviceXs: boolean;
  opened: boolean;
  constructor(private sidenavToggleService: SidenavToggleService) { }

  // Create access of #sidenav element for this file 
  @ViewChild('sidenav') public sideNav: MatSidenav;

  ngOnInit() {
    // Set Sidenav in Sidebar Toggle Service script to be #sidenav
    this.sidenavToggleService.setSidenav(this.sideNav);
  }

}
