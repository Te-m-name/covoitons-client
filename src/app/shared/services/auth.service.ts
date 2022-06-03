import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiURL;

  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  public isLoggedin$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  public signUp(user: User): Observable<any> {
    return this.http.post(`${this.url}/user/add`, user);
  }

  public signIn(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post(`${this.url}/login`, credentials).pipe(
      tap((token: any) => {
        if (token) {
          this.cookieService.set("access_token", token.access_token);
          this.cookieService.set("refresh_token", token.refresh_token);
        }
      })
    );
  }

  public refresh(token: string): Observable<any> {
    const headers= new HttpHeaders()
    .set('Authorization', 'Bearer ' + token);

    return this.http.get(`${this.url}/user/token/refresh`, { headers });
  }

  public fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/user/current-user`).pipe((
      tap((user: User) => {
        this.user$.next(user);
        if (user) {
          this.isLoggedin$.next(true);
        } else {
          this.isLoggedin$.next(false);
        }
      })
    ))
  }

  public logout(): void {
    this.cookieService.delete("access_token");
    this.cookieService.delete("refresh_token");
    this.user$.next(null);
    this.isLoggedin$.next(false);
  }

  public confirmAccount(token: string): Observable<any> {
    return this.http.get(`${this.url}/user/confirm?token=${token}`)
  }

}
