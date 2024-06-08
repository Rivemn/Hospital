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
  constructor(private http: HttpClient, private router: Router) { }
  getChats(): Observable<Chats[]> {
    return this.http.get<Chats[]>(`${this.apiUrl}/chats`).pipe(
      catchError(this.handleError)
    );
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
      observe: 'response' // Observe the full HTTP response
    }).pipe(
      map(response => {
        if (response.status === 200 && response.body?.chatId !== undefined) {
          return response.body.chatId;
        } else if (response.status === 404 && response.body?.message) {
          console.error(response.body.message);
          return null; // Return null if the chat is not found
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
    console.log('Creating chat with:', chat); // Debug log
    return this.http.post<Chats>(`${this.apiUrl}`, chat).pipe(
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
    console.log(`Checking chat between customerID=${customerID} and doctorID=${doctorID}`); // Debug log
    return this.http.get<Chats | null>(`${this.apiUrl}/chats/participants?customerID=${customerID}&doctorID=${doctorID}`).pipe(
      catchError(this.handleError)
    );
  }

  viewMessages(chatID: number): void {
    this.router.navigate(['/messages', chatID]);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error); // Log error to console
    throw error;
  }
}
