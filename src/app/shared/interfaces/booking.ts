export interface Booking {

  id: number;
  user_id: number;
  ride_id: number;
  accepted: boolean;
  userIdentity: string;
  driverIdentity: string;
  departure_date: string;
  arrival_time: string;
  departure: string;
  arrival : string;
}
