import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  public user: any;
  public infos:boolean = false;
  public bookedRides: boolean = false;
  public proposedRides: boolean = false;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  public bookings: boolean = false;
  public myBookingRequest: boolean = false;



  constructor(private service:AuthService) { }

  ngOnInit(): void {
      this.getUser();
/*       this.user$.subscribe(user => id_user = user);*/
      this.infos = true;
      this.getImage();
  }

  public getUser() {
    this.service.fetchCurrentUser().subscribe(user => this.user = user);
  }

  public seeInfos() {
    this.infos = true;
    this.bookedRides = false;
    this.proposedRides = false;
    this.bookings = false;
    this.myBookingRequest = false;
  }

  public seeBookedRides() {
    this.bookedRides = true;
    this.infos = false;
    this.proposedRides = false;
    this.bookings = false;
    this.myBookingRequest = false;
  }

  public seeProposedRides() {
    this.proposedRides = true;
    this.infos = false;
    this.bookedRides = false;
    this.bookings = false;
    this.myBookingRequest = false;
  }

  public getImage() {
    this.service.getImage()
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
  
  public seeBookingsOnMyRide() {
    this.proposedRides = false;
    this.infos = false;
    this.bookedRides = false;
    this.myBookingRequest = false;
    this.bookings = true;
  }

  public seeMyBookings() {
    this.proposedRides = false;
    this.infos = false;
    this.bookedRides = false;
    this.bookings = false;
    this.myBookingRequest = true;
  }

}
