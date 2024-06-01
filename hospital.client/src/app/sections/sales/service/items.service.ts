// src/app/services/subcategories.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Items } from '../models/Items';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private itemsUrl = '/api/items';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getItemsBySubcategoryName(subcategoryName: string): Observable<Items[]> {
    return this.http.get<Items[]>(`${this.itemsUrl}/${subcategoryName}`).pipe(
      tap(items => console.log(`Fetched items for ${subcategoryName}:`, items)),
      catchError(this.errorHandler.handleError)
    );
  }
}
