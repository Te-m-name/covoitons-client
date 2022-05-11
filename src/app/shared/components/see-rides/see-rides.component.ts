import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RidesService } from '../../services/rides.service';


@Component({
  selector: 'app-see-rides',
  templateUrl: './see-rides.component.html',
  styleUrls: ['./see-rides.component.scss']
})
export class SeeRidesComponent implements OnInit {

  rides: any = [];
  displayedRides = this.rides;
  public form: FormGroup = this.fb.group({
    city: [""]
  });

  @Input()
  public set changeRides(selectedRides: any) {
    this.displayedRides = selectedRides;
  }

  constructor(private rs: RidesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rs.getRides().subscribe(data => {
      this.rides = data;
      console.log(data)})
  }


/*   public getAllRides() {
    this.rs.getRides().subscribe(data => {
      this.displayedRides = data;
      console.log(this.rides[0]);
    });
  } */

  public submit() {
    console.log(this.form.value.city);
    this.rs.searchRideByCity(this.form.value.city).subscribe(data => {
      this.rides = data;
      console.log(data)})
  }    

}
