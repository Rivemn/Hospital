import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private apiUrl = '/api/doctors';

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getDoctorId(firstName: string, lastName: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/id/${firstName}/${lastName}`);
  }
  getDoctorByName(firstName: string, lastName: string): Observable<any> {
    const url = `${this.apiUrl}/${firstName}/${lastName}`;
    return this.http.get<any>(url);
  }
}
