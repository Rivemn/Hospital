import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { Chats } from '../models/Chats';
import { Messages } from '../models/Messages';
import { Router } from '@angular/router';
interface ChatResponse {
  chatId?: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private apiUrl = '/api'; // Измените на реальный URL вашего API

  constructor(private http: HttpClient) { }

  getChats(): Observable<Chats[]> {
    return this.http.get<Chats[]>(`${this.apiUrl}/chats`);
  }

  getMessages(chatId: number): Observable<Messages[]> {
    return this.http.get<Messages[]>(`${this.apiUrl}/messages/${chatId}`).pipe(
      catchError(this.handleError)
    );
  }

  sendMessage(message: Messages): Observable<Messages> {
    return this.http.post<Messages>(`${this.apiUrl}/messages`, message).pipe(
      catchError(this.handleError)
    );
  }

  getChatIdByNames(customerFirstName: string, customerLastName: string, doctorFirstName: string, doctorLastName: string): Observable<number | null> {
    return this.http.get<ChatResponse>(`${this.apiUrl}/chats/by-names`, {
      params: {
        customerFirstName,
        customerLastName,
        doctorFirstName,
        doctorLastName
      },
      observe: 'response'
    }).pipe(
      map(response => {
        if (response.status === 200 && response.body?.chatId !== undefined) {
          return response.body.chatId;
        } else if (response.status === 404 && response.body?.message) {
          console.error(response.body.message);
          return null;
        }
        throw new Error('Unexpected response status: ' + response.status);
      }),
      catchError(error => {
        if (error.status === 404 && error.error.message) {
          console.error('Chat not found:', error.error.message);
        } else {
          console.error('Unexpected error:', error);
        }
        return throwError(() => new Error('Failed to get chat ID'));
      })
    );
  }

  createChat(customerId: number, doctorId: number): Observable<Chats> {
    const chat: Partial<Chats> = { customerId, doctorId };
    console.log('Creating chat with:', chat);
    return this.http.post<Chats>(`${this.apiUrl}/chats`, chat).pipe(
      catchError(this.handleError)
    );
  }

  ensureChatExists(customerId: number, doctorId: number): Observable<Chats> {
    return this.getChatByParticipants(customerId, doctorId).pipe(
      switchMap(chat => {
        if (chat) {
          return of(chat);
        } else {
          return this.createChat(customerId, doctorId);
        }
      }),
      catchError(this.handleError)
    );
  }

  private getChatByParticipants(customerID: number, doctorID: number): Observable<Chats | null> {
    console.log(`Checking chat between customerID=${customerID} and doctorID=${doctorID}`);
    return this.http.get<Chats | null>(`${this.apiUrl}/chats/participants?customerID=${customerID}&doctorID=${doctorID}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
  getChatsByCustomer(customerId: number): Observable<any> {
    return this.http.get<any>(`/api/chats/${customerId}`).pipe(
      catchError(this.handleError)
    );
  }

}

