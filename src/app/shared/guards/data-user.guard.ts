import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first, mapTo, Observable, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataUserGuard implements CanActivate {

  constructor(
    private authService: AuthService,
  ) {}

  canActivate(): Observable<true> {
    return this.authService.user$.pipe(
      first(),
      switchMap((user: User | null): Observable<true> => {
        if(!user) {
          return this.authService.fetchCurrentUser().pipe(mapTo(true));
        } else {
          return of(true);
        }
      })
    )
  }
  
}
