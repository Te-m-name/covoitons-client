import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, FormBuilder } from '@angular/forms'
import { RidesService } from 'src/app/shared/services/rides.service';

@Component({
  selector: 'app-search-ride',
  templateUrl: './search-ride.component.html',
  styleUrls: ['./search-ride.component.scss']
})
export class SearchRideComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    city: [""]
  });

  rides: any;

  constructor(private rs: RidesService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public submit() {
    console.log(this.form.value.city);
    this.rs.searchRideByCity(this.form.value.city).subscribe(data => {
      this.rides = data;
      console.log(data)})
    
  }                                     

}
