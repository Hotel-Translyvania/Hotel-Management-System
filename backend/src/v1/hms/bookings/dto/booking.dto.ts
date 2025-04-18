export class BookingDto {
  bookingId: string;
  guestId: string;
  guestFirstName: string;
  guestLastName: string;
  roomNum: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  bookingStatus: string;
  createdAt: Date;
}