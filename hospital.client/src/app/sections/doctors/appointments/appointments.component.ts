import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointments.service';
import { Appointments } from '../models/Appointments';

import { AuthorizationService } from '../../../authorization/service/authorization.service';
import { SharedService } from '../service/shared.service';
import { AuthStateService } from '../../../authorization/service/auth-state.service';
import { Router } from '@angular/router';
import { DoctorsService } from '../service/doctors.service';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  selectedDoctor: any;
  customerId!: number ;
  appointmentDate!: string ;

  constructor(
    private sharedService: SharedService,
    private authStateService: AuthStateService,
    private appointmentService: AppointmentService,
    private router: Router,
    private doctorService: DoctorsService,
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
      this.doctorService.getDoctorId(this.selectedDoctor.firstName, this.selectedDoctor.lastName).subscribe(
        doctorId => {
          const appointment = {
            customerId: this.customerId,
            doctorId: doctorId,
            appointmentDate: new Date(this.appointmentDate as string) // Преобразование строки в дату
          };

          console.log('CustomerID:', this.customerId);
          console.log('SelectedDoctorId:', doctorId);
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
        },
        error => {
          console.error('Error fetching doctor ID:', error);
        }
      );
    } else {
      console.error('Missing appointment information');
    }
  }
}
