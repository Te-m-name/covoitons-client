import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  public getAllUsers(): Observable<any>{
    return this.http.get("http://localhost:8080/admin/getAllUsers");
  }

  public getAllRides(): Observable<any>{
    return this.http.get("http://localhost:8080/admin/getAllRides");
  }
}
