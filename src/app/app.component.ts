import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './shared/interfaces/user';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user$: Observable<User | null> = this.authService.user$.asObservable();

  constructor(private authService: AuthService, private router: Router) {}

  public logout() {
    const currentUrl = this.router.url;
    this.authService.logout();
    this.router.navigateByUrl("/");
  }
}
