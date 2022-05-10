import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RidesService {

  constructor(private http:HttpClient) { }


  getRides() {
    return this.http.get("http://localhost:8080/ride/getAll");
  }

}
