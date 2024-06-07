import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DoctorsDetailComponent } from './doctors-detail/doctors-detail.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ChatsComponent } from './chats/chats.component';
import { DoctorsRoutingModule } from './doctors-routing.module';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DoctorsListComponent,
    DoctorsDetailComponent,
    AppointmentsComponent,
    ChatsComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    FormsModule
  ],
  
})
export class DoctorsModule { }
