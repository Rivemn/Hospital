import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './sections/services/services.component';
import { DoctorsComponent } from './sections/doctors/doctors.component';
import { MedicinesComponent } from './sections/medicines/medicines.component';
import { AboutComponent } from './sections/about/about.component';

const routes: Routes = [
  { path: 'services', component: ServicesComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'medicines', component: MedicinesComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/services', pathMatch: 'full' },  // Редирект на страницу услуг по умолчанию
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
