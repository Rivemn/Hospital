import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedDoctorSource = new BehaviorSubject<any>(null);
  selectedDoctor$ = this.selectedDoctorSource.asObservable();

  setSelectedDoctor(doctor: any) {
    this.selectedDoctorSource.next(doctor);
  }
}
