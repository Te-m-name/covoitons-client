import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  public results: any;

  constructor(private as: AdminService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(){
    this.as.getAllUsers().subscribe(data=>
      this.results=data);
  }

  public updateIsAdmin(id: number, is_admin: Boolean){
    if (confirm("Confirmer le changement de rôle") == true) {
      this.as.updateIsAdmin(id, is_admin).subscribe();
    }else{
      this.results.reload();
    }
  }
}
