import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Импортируйте FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './sections/services/services.component';
import { DoctorsComponent } from './sections/doctors/doctors.component';
import { AboutComponent } from './sections/about/about.component';
import { SalesComponent } from './sections/sales/sales.component';
import { SalesModule } from './sections/sales/sales.module';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    DoctorsComponent,
    AboutComponent,
    RegistrationComponent,
    AuthorizationComponent
       
         
         
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, SalesModule, FormsModule, 

  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
