// For country bookings response
export class CountryBookingResponse {
  success: boolean;
  country: Array<Record<string, number>>;
}

// For demographics response
export class DemographicsResponse {
  success: boolean;
  male: number;
  female: number;
}

// For total bookings response
export class TotalBookingsResponse {
  success: boolean;
  booked: number;
}
