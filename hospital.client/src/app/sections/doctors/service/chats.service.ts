import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chats } from '../models/Chats';
import { Messages } from '../models/Messages';

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
    return this.http.get<Messages[]>(`${this.apiUrl}/messages/chat/${chatId}`);
  }

  sendMessage(message: Messages): Observable<Messages> {
    return this.http.post<Messages>(`${this.apiUrl}/messages`, message);
  }

}
