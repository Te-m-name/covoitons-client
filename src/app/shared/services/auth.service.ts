import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  public signUp(user: User): Observable<any>{

    return this.http.post("http://localhost:8080/user/add", user);
  }

  public signIn(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post('http://localhost:8080/login', credentials).pipe(
      tap((token: any) => {
        if (token) {
          this.cookieService.set("access_token", token.access_token);
        }
      })
    );
  }

}
