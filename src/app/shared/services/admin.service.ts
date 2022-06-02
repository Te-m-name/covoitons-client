import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = environment.apiURL;

  constructor(private http:HttpClient) { }

  public getAllUsers(): Observable<any>{
    return this.http.get(`${this.url}/admin/getAllUsers`);
  }

  public getAllRides(): Observable<any>{
    return this.http.get(`${this.url}/admin/getAllRides`);
  }

  public updateIsAdmin(id: number, is_admin: Boolean): Observable<any>{
    return this.http.patch(`${this.url}/admin/updateIsAdmin`, {id, is_admin});
  }

  public deleteRide(id: number):Observable<any>{
    return this.http.delete(`${this.url}/admin/deleteRide/${id}`);
  }

  public updateEnabled(id: number, enabled: Boolean):Observable<any>{
    return this.http.patch(`${this.url}/admin/updateEnabled`, {id, enabled});
  }
}
