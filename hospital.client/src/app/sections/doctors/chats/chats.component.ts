import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chats.service'; // Предполагается, что вы создадите этот сервис
import { Chats } from '../models/Chats';
import { Messages } from '../models/Messages';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { AuthorizationService } from '../../../authorization/service/authorization.service';
import { DoctorsService } from '../service/doctors.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  chats!: Chats[];
  customerId!: number ;
  doctorNames: { [doctorId: number]: string } = {};
  constructor(
    private chatService: ChatService,
    private router: Router,
    private authService: AuthorizationService,
    private doctorsService: DoctorsService
  ) { }

  ngOnInit(): void {
    const userIdStr = this.authService.getUserId();
    if (userIdStr) {
      this.customerId = parseInt(userIdStr, 10);
    }
    
    if (this.customerId !== null) {
      this.chatService.getChatsByCustomer(this.customerId).subscribe(
        chats => {
          this.chats = chats;
          this.fetchDoctorNames();
        },
        error => console.error('Error fetching chats:', error)
      );
    }
  }




  viewMessages(chatId: number): void {
    this.router.navigate(['/messages', chatId]);
  }

  private fetchDoctorNames(): void {
    const doctorIds = Array.from(new Set(this.chats.map(chat => chat.doctorId)));
    doctorIds.forEach(doctorId => {
      if (!this.doctorNames[doctorId]) {  // Check if the doctor name is already fetched
        this.doctorsService.getDoctorNameById(doctorId).subscribe(
          doctorName => {
            this.doctorNames[doctorId] = doctorName;
          },
          error => console.error('Error fetching doctor name:', error)
        );
      }
    });
  }

  getDoctorName(doctorId: number): string {
    return this.doctorNames[doctorId] || 'Loading...';
  }
}
