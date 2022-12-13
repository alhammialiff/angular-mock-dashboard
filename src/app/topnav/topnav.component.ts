import { Component, OnInit, Input } from '@angular/core';
import { SidenavToggleService } from '../services/sidenav-toggle.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  @Input() deviceXs: boolean;

  constructor(private sidenavToggleService: SidenavToggleService) { }

  ngOnInit() {
  }

  toggleSidenav(){
    this.sidenavToggleService.toggleSidenav();
  }

}
