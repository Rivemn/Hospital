import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Subcategories } from '../models/Subcategories';

import { ErrorHandlerService } from './error-handler.service';



@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private subcategoriesUrl = '/api/subcategories';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }



  getSubcategories(): Observable<Subcategories[]> {
    return this.http.get<Subcategories[]>(this.subcategoriesUrl).pipe(
      tap(subcategories => console.log('Fetched subcategories:', subcategories)),
      catchError(this.errorHandler.handleError)
    );
  }
  getSubcategoriesByCategoryName(categoryName: string): Observable<any> {
    return this.http.get<any>(`${this.subcategoriesUrl}/${categoryName}`).pipe(
      tap(subcategories => console.log(`Fetched subcategories for ${categoryName}:`, subcategories)),
      catchError(this.errorHandler.handleError)
    );
  }

}
