export class BookingDto {
    id: string;
    bookingStatus: string;
    checkIn: Date;
    checkOut: Date;
    hotel: {
      id: string;
      name: string;
    };
    room: {
      id: string;
      roomNumber: string;
    };
    createdAt: Date;
  }