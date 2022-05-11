import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RideInterface } from '../interfaces/ride.interface';

@Injectable({
  providedIn: 'root'
})
export class RidesService {

  constructor(private http:HttpClient) { }


  getRides() {
    return this.http.get("http://localhost:8080/ride/getAll");
  }

  public createRide(ride: RideInterface): Observable<any> {
    return this.http.post("http://localhost:8080/ride/add", ride);
  }

}
