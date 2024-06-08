import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chats.service'; // Предполагается, что вы создадите этот сервис
import { Chats } from '../models/Chats';
import { Messages } from '../models/Messages';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { AuthorizationService } from '../../../authorization/service/authorization.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  chats: Chats[] = [];
  customerId: number;
  doctorId: number | null = null;
  customerFirstName: string | null;
  customerLastName: string | null;
  doctorFirstName: string | undefined;
  doctorLastName: string | undefined;

  constructor(
    private chatService: ChatService,
    private sharedService: SharedService,
    private authService: AuthorizationService,
    private router: Router
  ) {
    const userId = this.authService.getUserId();
    this.customerId = userId ? parseInt(userId, 10) : -1;

    this.customerFirstName = this.authService.getFirstName();
    this.customerLastName = this.authService.getLastName();
  }

  ngOnInit(): void {
    this.sharedService.selectedDoctor$.subscribe(doctor => {
      if (doctor) {
        this.doctorId = doctor.doctorId;
        this.doctorFirstName = doctor.firstName;
        this.doctorLastName = doctor.lastName;
        this.ensureChatExists();
      }
    });

    this.chatService.getChats().subscribe(chats => this.chats = chats);
  }

  viewMessages(): void {
    if (this.customerFirstName && this.customerLastName && this.doctorFirstName && this.doctorLastName) {
      this.chatService.getChatIdByNames(this.customerFirstName, this.customerLastName, this.doctorFirstName, this.doctorLastName).subscribe({
        next: chatId => {
          this.router.navigate(['/messages', chatId]);
        }
      })
    }
  }

  ensureChatExists(): void {
    if (this.customerFirstName && this.customerLastName && this.doctorFirstName && this.doctorLastName) {
      this.chatService.getChatIdByNames(this.customerFirstName, this.customerLastName, this.doctorFirstName, this.doctorLastName).subscribe({
        next: chatId => {
          if (typeof chatId !== 'number') {
            // Если чата не существует, создаем новый
            this.chatService.ensureChatExists(this.customerId, this.doctorId!).subscribe({
              next: chat => {
                if (!chat) {
                  console.error('Failed to create or find chat');
                }
              },
              error: err => {
                console.error('Error in ensuring chat exists', err);
              }
            });
          }
        },
        error: err => {
          console.error('Error in getting chat by names', err);
        }
      });
    } else {
      console.error('Customer or Doctor names are not set');
    }
  }
}
