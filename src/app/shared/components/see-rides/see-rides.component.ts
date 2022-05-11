import { Component, OnInit } from '@angular/core';
import { RidesService } from '../../services/rides.service';


@Component({
  selector: 'app-see-rides',
  templateUrl: './see-rides.component.html',
  styleUrls: ['./see-rides.component.scss']
})
export class SeeRidesComponent implements OnInit {

  rides: any;

  constructor(private rs: RidesService) { }

  ngOnInit(): void {
    this.getRides();
  }


  getRides() {
    this.rs.getRides().subscribe(data => {
      this.rides = data;
      console.log(this.rides[0]);
    });
  }

  public getARide(id:any){
    this.rs.getARide(id).subscribe( () =>{
      console.log("trajet trouvé");
      console.log(id);
    });
  }
}
