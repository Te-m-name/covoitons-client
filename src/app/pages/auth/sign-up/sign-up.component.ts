import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    lastname: ["", Validators.required],
    firstname: ["", Validators.required],
    email: ["", Validators.required],
    employee_code: ["", Validators.required],
    password: ["", Validators.required],
    confirm_password: ["", Validators.required]
  });
  public error!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public submit(){
    if (this.form.valid){
      this.authService.signUp(this.form.getRawValue()).subscribe(()=>{
        this.router.navigateByUrl("");
      }, (err)=>{
        this.error=err?.error || "error"
      })
    }
  }

}
