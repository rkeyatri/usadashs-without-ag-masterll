import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing.module';
import { CoreModule } from './common/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts'; 
import { AppComponent } from './app.component';  
import { LoginComponent } from './login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layouts/header/header.component';
import { ImportsComponent } from './imports/imports.component';   
import { NgApexchartsModule } from 'ng-apexcharts';  
import { DashboardComponent } from './dashboard/dashboard.component';  
import { GoogleChartModule } from './angular-google-chart/google-chart.module';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        HomeComponent, 
        HeaderComponent,
        ImportsComponent,
        DashboardComponent
    ], 
    imports: [
        CoreModule,  
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule, 
        NgxChartsModule, 
        NgApexchartsModule, 
        GoogleChartModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
