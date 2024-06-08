import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../service/chats.service';
import { Messages } from '../models/Messages';
import { DoctorsService } from '../service/doctors.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval, switchMap } from 'rxjs';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() chatId!: number;
  messages: Messages[] = [];
  newMessageText: string | undefined;
  private intervalSubscription: Subscription | undefined;
  constructor(private chatService: ChatService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.chatId = +params.get('chatId')!;
      this.startMessagePolling();
    });
  }

  ngOnDestroy(): void {
    this.stopMessagePolling();
  }

  private startMessagePolling(): void {
    this.stopMessagePolling();
    this.intervalSubscription = interval(500) // Interval in milliseconds (e.g., 5000 for 5 seconds)
      .pipe(
        switchMap(() => this.chatService.getMessages(this.chatId))
      )
      .subscribe((data: Messages[]) => {
        this.messages = data;
      });
  }

  private stopMessagePolling(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  sendMessage(): void {
    if (this.newMessageText) {
      const message: Messages = {
        chatID: this.chatId,
        senderDoctorID: false,
        senderCustomerID: true,
        messageText: this.newMessageText, // Убедитесь, что this.newMessageText не равно null
        timestamp: new Date()
      };

      this.chatService.sendMessage(message).subscribe(() => { // Уберите data: Messages, так как вам не нужно использовать данные из ответа
        this.messages.push(message); // Используйте объект message, так как он не преобразуется после отправки на сервер
        this.newMessageText = '';
      });
    }
  }

}
