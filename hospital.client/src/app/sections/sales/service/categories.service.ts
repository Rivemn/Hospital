import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Subcategories } from '../models/Subcategories';
import { Categories } from '../models/Categories';




@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesUrl = '/api/categories';
  private subcategoriesUrl = '/api/subcategories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.categoriesUrl).pipe(
      tap(categories => console.log('Fetched categories:', categories)),
      catchError(this.handleError)
    );
  }

  getSubcategories(): Observable<Subcategories[]> {
    return this.http.get<Subcategories[]>(this.subcategoriesUrl).pipe(
      tap(subcategories => console.log('Fetched subcategories:', subcategories)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
