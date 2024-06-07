import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../service/chats.service';
import { Messages } from '../models/Messages';
import { DoctorsService } from '../service/doctors.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() chatId!: number;
  messages: Messages[] = [];
  newMessageText: string | undefined;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.getMessages(this.chatId).subscribe((data: Messages[]) => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    const message: Messages = {
      messageID: 0,
      chatID: this.chatId,
      messageText: this.newMessageText,
      timestamp: new Date()
    };

    this.chatService.sendMessage(message).subscribe((data: Messages) => {
      this.messages.push(data);
      this.newMessageText = '';
    });
  }
}
