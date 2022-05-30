import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmGuard implements CanActivate {
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
        if(this.token && this.isTokenExpired(this.token)){
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
