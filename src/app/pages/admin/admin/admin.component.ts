import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../shared/services/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  results?: any[];

  constructor(private as: AdminService) { }

  ngOnInit(): void {
  }

  public getAllUsers(){
    this.as.getAllUsers().subscribe(data=>
      this.results=data)
  }

  public getAllRides(){
    this.as.getAllRides().subscribe(data=>
    this.results=data)
  }

}
