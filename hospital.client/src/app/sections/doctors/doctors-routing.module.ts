import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: 'detail/:id', component: DoctorDetailComponent },
  { path: 'appointment/:id', component: AppointmentComponent },
  { path: 'chat/:id', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
