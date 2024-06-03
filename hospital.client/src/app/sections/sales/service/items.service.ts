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
export class ItemsService {
  private itemsUrl = '/api/items';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  getItems(): Observable<Items[]> {
    return this.http.get<Items[]>(this.itemsUrl).pipe(
      tap(categories => console.log('Fetched items:', categories)),
      catchError(this.errorHandler.handleError)
    );
  }



  getItemsBySubcategoryName(subcategoryName: string): Observable<any> {
  
    return this.http.get<any>(`${this.itemsUrl}/${subcategoryName}`).pipe(
      tap(items => console.log(`Fetched items for ${subcategoryName}:`, items)),
      catchError(this.errorHandler.handleError)
    );
  }
  
  getItemByName(itemName: string): Observable<Items> {
    return this.http.get<Items>(`${this.itemsUrl}/item/${itemName}`).pipe(
      tap(item => console.log(`Fetched item:`, item)),
      catchError(this.errorHandler.handleError)
    );
  }
}
