import { Component, OnInit } from '@angular/core';
import {RidesService} from "../../shared/services/rides.service";
import {ActivatedRoute, Router} from "@angular/router";
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-see-a-ride',
  templateUrl: './see-a-ride.component.html',
  styleUrls: ['./see-a-ride.component.scss']
})
export class SeeARideComponent implements OnInit {
  public ride:any;
  public id?: string | null;
  public user$ = this.authService.user$;
  constructor(private rs: RidesService, private router:Router, private actRoute: ActivatedRoute, private authService: AuthService) { }

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

  public reservation() {
    this.user$.subscribe((data) => {
      console.log(data)
    })
  }
}
