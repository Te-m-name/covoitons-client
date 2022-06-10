import { Component, OnInit } from '@angular/core';
import {RidesService} from "../../shared/services/rides.service";
import {ActivatedRoute, Router} from "@angular/router";

import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/shared/interfaces/user';
import {RideInterface} from "../../shared/interfaces/ride.interface";

@Component({
  selector: 'app-see-a-ride',
  templateUrl: './see-a-ride.component.html',
  styleUrls: ['./see-a-ride.component.scss']
})
export class SeeARideComponent implements OnInit {
  public ride!: RideInterface;
  public id?: string | null;

  public user$: Observable<User | null> = this.authService.user$.asObservable();

  public user!:User | null;

  constructor(private rs: RidesService, private router:Router, private actRoute: ActivatedRoute, private authService: AuthService) { }


  ngOnInit(): void {

    this.currentUser();
    this.actRoute.paramMap.subscribe(res => {
      this.id = res.get('id');
    });
    this.getARide();
  }

  public currentUser() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }

  public getARide(){
    this.rs.getARide(this.id).subscribe( data => {
      this.ride = data;
    });
  }

  public booking(ride_id: number) {

    let user_id: any;
    this.user$.subscribe(user => {
      user_id = user?.id;
    });

    this.rs.setReservation(user_id, ride_id).subscribe(()=>{
      this.router.navigateByUrl("");
    });

  }
}
