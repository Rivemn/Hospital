import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DoctorsDetailComponent } from './doctors-detail/doctors-detail.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ChatsComponent } from './chats/chats.component';
import { DoctorsComponent } from './doctors.component';
import { MessagesComponent } from './messages/messages.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent,
    children: [

      { path: 'doctors-list', component: DoctorsListComponent },
      { path: 'doctor-detail', component: DoctorsDetailComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'chats', component: ChatsComponent }, 
      { path: 'messages/:chatId', component: MessagesComponent },
      { path: 'manage-appointments', component:ManageAppointmentsComponent },
    
      { path: '', redirectTo: 'doctors-list', pathMatch: 'full' }  // Редирект на страницу категорий с товарами по умолчанию
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class DoctorsRoutingModule { }
