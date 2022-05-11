import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first, mapTo, Observable, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DataUserGuard implements CanActivate {

  private token = this.cookieService.get("access_token");

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(): Observable<true> {
    return this.authService.user$.pipe(
      first(),
      switchMap((user: User | null): Observable<true> => {
        if(this.isTokenExpired(this.token)){
          this.router.navigateByUrl("/connexion")
          return of(true)
        }
        else if(!user) {
          return this.authService.fetchCurrentUser().pipe(mapTo(true));
        } else {
          return of(true);
        }
      })
    )
  }

  private isTokenExpired(token: string) {
    const expiration = (JSON.parse(atob(token.toString().split('.')[1]))).exp;
    return expiration * 1000 < Date.now();
  }
  
}
