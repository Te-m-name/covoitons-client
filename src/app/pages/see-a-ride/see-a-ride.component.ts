import { Component, OnInit } from '@angular/core';
import {RidesService} from "../../shared/services/rides.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Observable } from 'rxjs/internal/Observable';
import {User} from "../../shared/interfaces/user";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-see-a-ride',
  templateUrl: './see-a-ride.component.html',
  styleUrls: ['./see-a-ride.component.scss']
})
export class SeeARideComponent implements OnInit {
  public ride:any;
  public id?: string | null;
  public user$: Observable<User | null> = this.authService.user$.asObservable();

  constructor(private rs: RidesService, private router:Router, private actRoute: ActivatedRoute, private authService:AuthService) { }

  ngOnInit(): void {

    this.actRoute.paramMap.subscribe(res => {
      this.id = res.get('id');
      console.log(this.id);
    });
    this.getARide();
  }

  public getARide(){
    this.rs.getARide(this.id).subscribe( data => {
      this.ride = data;
      console.log(this.ride);
      console.log("trajet trouvé");
      console.log(this.id);
    });
  }

  public reservation(ride_id: number){

    let id_user;
    this.user$.subscribe(user=>{
      id_user = user?.id;
    });

    console.log(id_user);
    console.log(ride_id);

  }
}
