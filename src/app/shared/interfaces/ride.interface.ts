import { Time } from "@angular/common";

export interface RideInterface {
  id_ride: number;
  street: string;
  post_code: number;
  city: string;
  date: string;
  home_to_office: boolean;
  places: number;
  id_user: number;
  driverFirstname: string;
  driverLastname: string;
  departure: string;
  arrival: string;
  arrival_time: string;
  lat: number;
  lng: number;
}
