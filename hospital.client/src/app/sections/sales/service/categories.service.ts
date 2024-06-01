import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Categories } from '../models/Categories';
import { ErrorHandlerService } from './error-handler.service';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesUrl = '/api/categories';


  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.categoriesUrl).pipe(
      tap(categories => console.log('Fetched categories:', categories)),
      catchError(this.errorHandler.handleError)
    );
  }



}
