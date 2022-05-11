import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { RidesService } from '../../shared/services/rides.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-see-rides',
  templateUrl: './see-rides.component.html',
  styleUrls: ['./see-rides.component.scss']
})
export class SeeRidesComponent implements OnInit {

  rides: any = [];
  public form: FormGroup = this.fb.group({
    city: [""]
  });

  constructor(private rs: RidesService, private fb: FormBuilder, private router : Router) { }

  ngOnInit(): void {

    this.rs.getRides().subscribe(data =>
      this.rides = data)
  }

  public submit() {
    this.rs.searchRideByCity(this.form.value.city).subscribe(data =>{
      console.log(data[0]);
      this.rides = data
    });
  }
}