import {Component, Input, OnInit} from '@angular/core';
import {RidesService} from "../../services/rides.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-booking-request',
  templateUrl: './user-booking-request.component.html',
  styleUrls: ['./user-booking-request.component.scss']
})
export class UserBookingRequestComponent implements OnInit {

  @Input()
  public user: any;
  public myBookingRequest: any;

  constructor(private rs: RidesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMyRequest(this.user);
  }

  private getAllMyRequest(user: any) {
    this.rs.getMyBookingsRequest(this.user.id).subscribe(bookings => this.myBookingRequest = bookings);
  }

  public cancel(id: number){
    this.rs.cancelBooking(id).subscribe(()=> {
      this.getAllMyRequest(this.user);
    });
  }

}
