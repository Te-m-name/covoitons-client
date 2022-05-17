import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { RideInterface } from '../interfaces/ride.interface';


@Injectable({
  providedIn: 'root'
})
export class RidesService {

  public rides$: BehaviorSubject<RideInterface | null> = new BehaviorSubject<RideInterface | null>(
    null
  );

  constructor(private http:HttpClient) { }


  public getRides(): Observable<any> {
    return this.http.get("http://localhost:8080/ride/getAll");
  }

  public createRide(ride: RideInterface): Observable<any> {
    return this.http.post("http://localhost:8080/ride/add", ride);
  }
  
  public getARide(id: string | null | undefined): Observable<any>{
    return this.http.get("http://localhost:8080/ride/getARide/"+ id);
  }

  public searchRideByCity(form: any): Observable<any> {
    return this.http.get(`http://localhost:8080/ride/get?city=${form.city}&home_to_office=${form.home_to_office}&date=${form.date}`).pipe(
      tap((rides: any) => {
        this.rides$.next(rides);
        console.log(this.rides$);
      })
    )
  }

  public getLastRides(): Observable<any>{
    return this.http.get("http://localhost:8080/ride/getLast");
  }

}
