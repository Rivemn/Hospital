import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './sections/services/services.component';
import { DoctorsComponent } from './sections/doctors/doctors.component';


import { AboutComponent } from './sections/about/about.component';
import { SalesComponent } from './sections/sales/sales.component';
import { SalesModule } from './sections/sales/sales.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    DoctorsComponent,
    AboutComponent
       
         
         
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, SalesModule

  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
