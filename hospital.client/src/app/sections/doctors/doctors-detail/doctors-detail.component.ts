import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsService } from '../service/doctors.service';
import { SharedService } from '../service/shared.service';
import { ChatService } from '../service/chats.service';
import { AuthorizationService } from '../../../authorization/service/authorization.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctors-detail.component.html',
  styleUrls: ['./doctors-detail.component.css']
})
export class DoctorsDetailComponent implements OnInit {
  doctor: any;
  customerId: number;

  constructor(
    private sharedService: SharedService,
    private chatService: ChatService,
    private authService: AuthorizationService,
    private router: Router
  ) {
    const userId = this.authService.getUserId();
    this.customerId = userId ? parseInt(userId, 10) : -1;
  }

  ngOnInit(): void {
    this.sharedService.selectedDoctor$.subscribe(
      doctor => this.doctor = doctor
    );
  }

  bookAppointment(): void {
    console.log(`Запись на прием к доктору: ${this.doctor.firstName} ${this.doctor.lastName}`);
    this.router.navigate(['/appointments', { doctorId: this.doctor.doctorId }]);
  }

  startChat(): void {
    console.log(`Начало чата с доктором: ${this.doctor.firstName} ${this.doctor.lastName}`);
    if (this.customerId !== -1 && this.doctor.doctorId) {
      this.chatService.ensureChatExists(this.customerId, this.doctor.doctorId).subscribe(chat => {
        this.router.navigate(['/messages', chat.chatId]);
      });
    }
  }
}
