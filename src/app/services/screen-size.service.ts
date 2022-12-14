import { Injectable, HostListener } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs';
import { map, mapTo, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  public screenWidth: any;
  public screenHeight: any;
  public screenResolution: any[];
  constructor() { }

  // Create an observable to pass Window innerWidth on resize event trigger
  innerWidth$ = fromEvent(window, 'resize')
    .pipe(
      startWith(window),
      mapTo(window),
      map((window: Window) => {
        return window.innerWidth;
      })
    );

  // Create an observable to pass Window innerHeight on resize event trigger
  innerHeight$ = fromEvent(window, 'resize')
    .pipe(
      startWith(window),
      mapTo(window),
      map((window: Window)=>{
        return window.innerHeight;
      })
    )
}
