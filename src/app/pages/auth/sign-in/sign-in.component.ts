import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public submit() {
    if (this.form.valid) {
      this.authService.signIn(this.form.getRawValue()).subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.error = err?.error || "Mauvais mot de passe ou email";
      })
    }
  }

}
