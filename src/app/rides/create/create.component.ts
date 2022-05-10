import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public form_rides: FormGroup=this.fb.group({
    street: ["", Validators.required],
    post_code: ["", Validators.required],
    city: ["", Validators.required],
    date:["", Validators.required],
    home_to_office: ["", Validators.required],
    places: ["", Validators.required]
  });
  public error!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  public submit(){
    if (this.form_rides.valid){
      this.authService.createRide(this.form_rides.getRawValue()).subscribe(()=>{
        this.router.navigateByUrl("");
      }, (err)=>{
        this.error=err?.error || "error"
      })
    }
  }
}
