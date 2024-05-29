import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './sections/services/services.component';
import { DoctorsComponent } from './sections/doctors/doctors.component';
import { MedicinesComponent } from './sections/medicines/medicines.component';

import { AboutComponent } from './sections/about/about.component';
import { SalesComponent } from './sections/sales/sales.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    DoctorsComponent,
    MedicinesComponent,
   
    AboutComponent,
         SalesComponent
         
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
