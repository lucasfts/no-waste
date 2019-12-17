import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FlexLayoutModule  } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateHistoryComponent } from './create-history/create-history.component';
import { FoodComponent } from './food/food.component';
import { HistoryEventComponent } from './history-event/history-event.component';
import { HistoryComponent } from './history/history.component';
import { AboutComponent } from './about/about.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    DashboardComponent,
    LineChartComponent,
    PieChartComponent,
    BarChartComponent,
    SettingsComponent,
    CreateHistoryComponent,
    FoodComponent,
    HistoryEventComponent,
    HistoryComponent,
    AboutComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ChartsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [FoodComponent, HistoryEventComponent]
})
export class AppModule { }
