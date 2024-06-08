import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointments } from '../models/Appointments';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = '/api/appointments';

  constructor(private http: HttpClient) { }


  getAppointments(): Observable<Appointments[]> {
    return this.http.get<Appointments[]>(this.apiUrl);
  }

  createAppointment(appointment: Appointments): Observable<Appointments> {
    return this.http.post<Appointments>(this.apiUrl, appointment);
  }

  getAppointment(id: number): Observable<Appointments> {
    return this.http.get<Appointments>(`${this.apiUrl}/${id}`);
  }
}
