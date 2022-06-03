import { Component, Input, OnInit } from '@angular/core';
import { RidesService } from '../../services/rides.service';

@Component({
  selector: 'app-user-proposed-ride',
  templateUrl: './user-proposed-ride.component.html',
  styleUrls: ['./user-proposed-ride.component.scss']
})
export class UserProposedRideComponent implements OnInit {

  @Input()
  public user: any;

  public rides: any;

  constructor(private service: RidesService) { }

  ngOnInit(): void {
    this.getProposedRides();
  }

  public getProposedRides() {
    this.service.getProposedRides(this.user.id).subscribe(rides => this.rides = rides);
  }

  /* public seeRide(id: string) {
    this.service.getARide(id).subscribe()
  } */

  public cancelBooking(){

  }

}
