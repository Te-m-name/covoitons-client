import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  
  public form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  public error!: string;
  public next!: string | null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(params => {
      this.next = params['next'];
    })
  }

  public submit() {
    if (this.form.valid) {
      this.authService.signIn(this.form.getRawValue()).subscribe((data) => {
        this.authService.fetchCurrentUser().subscribe(() => {
          if (this.next) {
            this.router.navigateByUrl(this.next);
          } else {
            this.router.navigateByUrl('/');
          }
        })
      },
      (err) => {
        const message = err?.error.message;
        if(message == "Bad credentials") {
          this.error = "Mauvais mot de passe ou email";
        } else {
          this.error = err?.error.message;
        }
      })
    }
  }

}
