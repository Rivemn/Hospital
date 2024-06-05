import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ChatComponent } from './chat/chat.component';
import { DoctorsRoutingModule } from './doctors-routing.module';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorDetailComponent,
    AppointmentComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    FormsModule
  ],
  
})
export class DoctorsModule { }
