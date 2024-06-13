import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DoctorsDetailComponent } from './doctors-detail/doctors-detail.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ChatsComponent } from './chats/chats.component';
import { DoctorsRoutingModule } from './doctors-routing.module';

import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { DoctorsComponent } from './doctors.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';

@NgModule({
  declarations: [
    DoctorsComponent,
    DoctorsListComponent,
    DoctorsDetailComponent,
    AppointmentsComponent,
    ChatsComponent,
    MessagesComponent,
    DoctorHeaderComponent,
    ManageAppointmentsComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    FormsModule
  ],
  exports: [
    DoctorsComponent
  ],
  
})
export class DoctorsModule { }
