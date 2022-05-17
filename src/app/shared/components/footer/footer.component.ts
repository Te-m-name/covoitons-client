import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public user$: Observable<User | null> = this.authService.user$.asObservable();
  public user = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuth()
  }

  public isAuth() {
    this.user$.subscribe(user => {
      user ? this.user = true : this.user = false;
    })
  }

}
