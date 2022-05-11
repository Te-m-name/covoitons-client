import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms'
import { RidesService } from 'src/app/shared/services/rides.service';

@Component({
  selector: 'app-search-ride',
  templateUrl: './search-ride.component.html',
  styleUrls: ['./search-ride.component.scss']
})
export class SearchRideComponent implements OnInit {

  rides: any;

  submit(form: NgForm) {
    console.log(form.value);   
  }

  constructor(private rs: RidesService) { }

  ngOnInit(): void {
  }

  searchRideByCity(city: string) {
    this.rs.searchRideByCity(city).subscribe(data => 
      this.rides = data)
  }                                     

}
