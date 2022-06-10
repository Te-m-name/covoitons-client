import {Component, Input, OnInit} from '@angular/core';
import {RidesService} from "../../services/rides.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {

  @Input()
  public user: any;
  public bookings: any;

  constructor(private rs: RidesService, private router:Router) { }

  ngOnInit(): void {
    this.getAllRequest(this.user);
  }

  private getAllRequest(user: any) {
    this.rs.getBookingsRequest(this.user.id).subscribe(bookings => this.bookings = bookings);
  }

  public validate(id : number){
    this.rs.acceptBooking(id).subscribe( ()=>{
      this.getAllRequest(this.user);})
  }

  public reject(id : number){
    this.rs.rejectBooking(id).subscribe(()=>{
      this.getAllRequest(this.user);})
  }
}
