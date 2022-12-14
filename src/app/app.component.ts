import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MediaChange, MediaService } from '@angular/flex-layout';
import { ScreenSizeService } from './services/screen-size.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-mock-dashboard';
  mediaSub: Subscription;
  screenServiceSub: Subscription;
  deviceXs: boolean;
  public innerWidth: any;
  public innerHeight: any;
  
  constructor(public mediaService: MediaService){}

  ngOnInit(){
    this.mediaSub = this.mediaService.subscribe((res: MediaChange)=>{
      // console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })


  }

  @HostListener('window:resize',['$event'])
  onResize(event){
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    // console.log(this.innerWidth);
    // console.log(this.innerHeight);
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

}
