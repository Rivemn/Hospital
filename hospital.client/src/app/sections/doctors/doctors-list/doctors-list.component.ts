import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../service/doctors.service';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.css'
})
export class DoctorsListComponent implements OnInit {
  doctors: any[] = [];

  constructor(
    private doctorService: DoctorsService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe(
      (data) => this.doctors = data,
      (error) => console.error(error)
    );
  }

  viewDoctorDetails(doctor: any): void {
    this.sharedService.setSelectedDoctor(doctor);
    this.router.navigate(['doctor-detail']);
  }
}
