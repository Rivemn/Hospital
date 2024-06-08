import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointments.service';
import { Appointments } from '../models/Appointments';

import { AuthorizationService } from '../../../authorization/service/authorization.service';
import { SharedService } from '../service/shared.service';
import { AuthStateService } from '../../../authorization/service/auth-state.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  selectedDoctor: any;
  customerId: number | null = null;
  appointmentDate: string | null = null; // Тип string для совместимости с input[type="datetime-local"]

  constructor(
    private sharedService: SharedService,
    private authStateService: AuthStateService,
    private appointmentService: AppointmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sharedService.selectedDoctor$.subscribe(doctor => {
      this.selectedDoctor = doctor;
    });

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.customerId = +userId;
    } else {
      this.authStateService.loggedIn$.subscribe(loggedIn => {
        if (loggedIn) {
          const id = localStorage.getItem('userId');
          if (id) {
            this.customerId = +id;
          }
        }
      });
    }
  }
  makeAppointment(): void {


    if (this.customerId && this.selectedDoctor && this.appointmentDate) {
      const appointment = {
        customerID: this.customerId,
        doctorID: this.selectedDoctor.id,
        appointmentDate: new Date(this.appointmentDate) // Преобразование строки в дату
      };
    console.log('CustomerID:', this.customerId);
    console.log('SelectedDoctor:', this.selectedDoctor);
    console.log('AppointmentDate:', this.appointmentDate);
      this.appointmentService.createAppointment(appointment).subscribe(
        response => {
          console.log('Appointment created successfully:', response);
          this.router.navigate(['/appointments']);
        },
        error => {
          console.error('Error creating appointment:', error);
        }
      );
    } else {
      console.error('Missing appointment information');
    }
  }
}
