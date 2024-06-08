import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsService } from '../service/doctors.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctors-detail.component.html',
  styleUrls: ['./doctors-detail.component.css']
})
export class DoctorsDetailComponent implements OnInit {
  doctor: any;

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.sharedService.selectedDoctor$.subscribe(
      doctor => this.doctor = doctor
    );
  }

  bookAppointment(): void {
    console.log(`Запись на прием к доктору: ${this.doctor.firstName} ${this.doctor.lastName}`);
    this.router.navigate(['/appointments', { doctorId: this.doctor.doctorId }]);
  }

  startChat(): void {
    console.log(`Начало чата с доктором: ${this.doctor.firstName} ${this.doctor.lastName}`);
    this.router.navigate(['/chats', { doctorId: this.doctor.doctorId }]);
  }
}
