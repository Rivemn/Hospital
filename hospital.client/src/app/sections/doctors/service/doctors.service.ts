import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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

  getDoctorNameById(doctorId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${doctorId}`, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('An error occurred; please try again later.'));
  }

}
