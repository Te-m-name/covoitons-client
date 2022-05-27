import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../shared/services/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  results?: any[];

  public users:boolean =  false;
  public rides: boolean = false;

  constructor(private as: AdminService) { }

  ngOnInit(): void {
  }

  public getAllUsers(){
    this.users=true;
    this.rides=false;
  }

  public getAllRides(){
    this.rides = true;
    this.users = false;
  }

}
