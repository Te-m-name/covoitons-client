import {Component, Input, OnInit} from '@angular/core';
import {RidesService} from "../../services/rides.service";

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {

  @Input()
  public user: any;
  public booking: any;
  public rides: any;

  constructor(private service: RidesService) { }

  ngOnInit(): void {
  }

}
