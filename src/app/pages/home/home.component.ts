import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RideInterface } from 'src/app/shared/interfaces/ride.interface';
import { RidesService } from 'src/app/shared/services/rides.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public rides!: [RideInterface];

  public form: FormGroup = this.fb.group({
    city: ['', Validators.required],
    home_to_office: ['', Validators.required],
    date: ['', Validators.required]
  });

  constructor(private ridesService: RidesService, private fb: FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.getRides();
  }

  public getRides() {
    this.ridesService.getLastRides().subscribe(data => this.rides = data)
  }

  public submit() {
    if (this.form.valid) {
      this.ridesService.searchRideByCity(this.form.getRawValue()).subscribe((data) => {
        this.router.navigateByUrl("/trajets");
      })
    }
  }

}
