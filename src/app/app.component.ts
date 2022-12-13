import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaChange, MediaService } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-mock-dashboard';
  mediaSub: Subscription;
  deviceXs: boolean;
  
  constructor(public mediaService: MediaService){}

  ngOnInit(){
    this.mediaSub = this.mediaService.subscribe((res: MediaChange)=>{
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

}
