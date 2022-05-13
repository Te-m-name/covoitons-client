import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const token = this.cookieService.get("access_token")

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      })

      return next.handle(clonedRequest)
    } else {
      return next.handle(req)
    }
  }
}