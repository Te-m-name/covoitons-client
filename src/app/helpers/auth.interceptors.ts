import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs'
import { AuthService } from '../shared/services/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private cookieService: CookieService, private authService: AuthService, private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const token = this.cookieService.get("access_token")
    let authReq = req;


    if (token && req.url.search("user/token/refresh") === -1 ) {
      authReq = this.addHeader(req, token);
    } else {
      return next.handle(req);
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('connexion') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }
      return throwError(error);
    }));

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.cookieService.get("refresh_token");
      if (token)
        return this.authService.refresh(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.cookieService.set("access_token", token.access_token);
            this.refreshTokenSubject.next(token.accessToken);
            
            return next.handle(this.addHeader(request, token.access_token));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            
            this.authService.logout();
            this.router.navigateByUrl("/connexion")
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addHeader(request, token)))
    );
  }

  private addHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    })
  }
}