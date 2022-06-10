import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './shared/interfaces/user';
import { AuthService } from './shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public user$: Observable<User | null> = this.authService.user$.asObservable();
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadScript()
    this.getImage()
  }

  public logout() {
    const currentUrl = this.router.url;
    this.authService.logout();
    this.router.navigateByUrl("/");
  }

  public getImage() {
    this.authService.getImage()
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  private loadScript() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleKey}&libraries=places&language=en`
    const head = document.getElementsByTagName('head')[0];
    if (head !== null && head !== undefined) {
      document.head.appendChild(script);
    }
  }
  
}
