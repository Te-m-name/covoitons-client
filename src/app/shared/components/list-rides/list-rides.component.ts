import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-list-rides',
  templateUrl: './list-rides.component.html',
  styleUrls: ['./list-rides.component.scss']
})
export class ListRidesComponent implements OnInit {

  public results: any;

  constructor(private as: AdminService) { }

  ngOnInit(): void {
    this.getAllRides();
  }

  private getAllRides(){
    this.as.getAllRides().subscribe(data=>{
      this.results=data
    })
  }

  public deleteRide(id: number, index: number){
    if (confirm("Confirmer la suppression du trajet") == true) {
      this.as.deleteRide(id).subscribe(()=>{
        this.results.splice(index, 1);
      });
    }
  }

}
