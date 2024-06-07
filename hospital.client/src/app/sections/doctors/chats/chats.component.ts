import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chats.service'; // Предполагается, что вы создадите этот сервис
import { Chats } from '../models/Chats';
import { Messages } from '../models/Messages';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  chats: any[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getChats().subscribe(chats => this.chats = chats);
  }
}
