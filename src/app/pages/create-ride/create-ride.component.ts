import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RidesService} from "../../shared/services/rides.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create-ride.component.html',
  styleUrls: ['./create-ride.component.scss']
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

  constructor(private fb: FormBuilder, private ridesService: RidesService, private router:Router) { }

  ngOnInit(): void {
  }

  public submit(){
    if (this.form_rides.valid){
      this.ridesService.createRide(this.form_rides.getRawValue()).subscribe(()=>{

        this.router.navigateByUrl("");
      }, (err)=>{
        this.error=err?.error || "error"
      })
    }
  }
}
