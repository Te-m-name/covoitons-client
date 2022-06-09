import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, Input, OnInit } from '@angular/core';
import { RidesService } from '../../services/rides.service';

@Component({
  selector: 'app-user-booked-ride',
  templateUrl: './user-booked-ride.component.html',
  styleUrls: ['./user-booked-ride.component.scss']
})
export class UserBookedRideComponent implements OnInit {

  @Input()
  public user: any;

  public rides: any;

  constructor(private service: RidesService) { }

  ngOnInit(): void {
    this.getBookedRides(this.user);
  }

  private getBookedRides(user: any) {
    this.service.getBookedRides(this.user.id).subscribe(rides => {
      this.rides = rides;
    })
  }

  public cancelBooking(){

  }
}
