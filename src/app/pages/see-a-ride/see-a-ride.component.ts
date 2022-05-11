import { Component, OnInit } from '@angular/core';
import {RidesService} from "../../shared/services/rides.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-see-a-ride',
  templateUrl: './see-a-ride.component.html',
  styleUrls: ['./see-a-ride.component.scss']
})
export class SeeARideComponent implements OnInit {

  constructor(private rs: RidesService, private router:Router) { }

  ngOnInit(): void {
  }

  public getARide(id:any){
    this.rs.getARide(id).subscribe( () =>{
    console.log("trajet trouvé");
    //this.router.navigate(["/trajet"]);
    console.log(id);
    });
  }
}
