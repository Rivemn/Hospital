export interface Messages {
  messageID: number;
  chatID: number;
  senderDoctorID?: number;
  senderCustomerID?: number;
  messageText: string;
  timestamp: Date;
}
