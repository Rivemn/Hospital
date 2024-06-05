import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './sections/services/services.component';
import { DoctorsComponent } from './sections/doctors/doctors.component';

import { AboutComponent } from './sections/about/about.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
const routes: Routes = [
  { path: 'services', component: ServicesComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'sales',
    loadChildren: () => import('./sections/sales/sales.module').then(m => m.SalesModule)
  },
  { path: '', redirectTo: '/services', pathMatch: 'full' },  // Редирект на страницу услуг по умолчанию
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
