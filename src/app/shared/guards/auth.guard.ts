import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { first, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.isLoggedin$.pipe(
      first(),
      tap((isLoggedin: boolean) => {
        if (!isLoggedin) {
          this.router.navigateByUrl(`/connexion?next=${route.url}`);
        }
      })
    );
  }
  
}
