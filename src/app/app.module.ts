import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { HomeComponent } from './home/home.component';
import { SpendingChartComponent } from './spending-chart/spending-chart.component';

import { SpendingService } from './services/spending.service';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { UtilitiesService } from './services/utilities.service';
import { UtilitiesChartComponent } from './utilities-chart/utilities-chart.component';
import { MatTabsModule } from '@angular/material/tabs';

import { RippleGlobalOptions } from '@angular/material';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    TopnavComponent,
    HomeComponent,
    SpendingChartComponent,
    UtilitiesChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    AppRoutingModule,
    MatCardModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    SpendingService,
    UtilitiesService,
    { provide: 'BaseURL', useValue: baseURL },
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
