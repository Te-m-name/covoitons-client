import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RidesService } from '../../shared/services/rides.service';
import {Router} from "@angular/router";
import { Observable } from 'rxjs/internal/Observable';
import { RideInterface } from 'src/app/shared/interfaces/ride.interface';


@Component({
  selector: 'app-see-rides',
  templateUrl: './see-rides.component.html',
  styleUrls: ['./see-rides.component.scss']
})
export class SeeRidesComponent implements OnInit {
  public rides$: Observable<RideInterface | null> = this.rs.rides$.asObservable();
  public loading = false;

  rides: any = [];
  public form: FormGroup = this.fb.group({
    city: ['', Validators.required],
    home_to_office: ['', Validators.required],
    date: ['', Validators.required]
  });

  constructor(private rs: RidesService, private fb: FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.rides$.subscribe(data => {
      if (data) {
        this.rides = data;
        this.loading = false;
      } else {
        this.getAllRides()
      }
    }) 
  }

  public submit() {
    if (this.form.valid) {
      this.loading = true;
      
      this.rs.searchRideByCity(this.form.getRawValue()).subscribe((data) => {
        this.rides = data;
        this.loading = false;
      })
    }
  }

  public getAllRides() {
    this.rs.getRides().subscribe((data) => {
      this.rides = data;
      this.loading = false;
    })
  }
}
