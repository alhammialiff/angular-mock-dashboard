import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav'


@Injectable({
  providedIn: 'root'
})
export class SidenavToggleService {
  // sidebarShow
  sideNav: MatSidenav;

  constructor() { }

  // Set Sidenav
  setSidenav(sideNav: MatSidenav ){
    this.sideNav = sideNav;
  }

  // toggleSidebar
  toggleSidenav(): void{
    this.sideNav.toggle();
  }

}
