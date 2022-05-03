import { Injectable } from '@angular/core';
import {UserInterface} from "../interfaces/user.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public signUp(user: UserInterface): Observable<any>{

    return this.http.post("http://localhost:8080/user/add", user);
  }
}
