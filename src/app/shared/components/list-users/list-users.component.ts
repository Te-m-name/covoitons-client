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

  public updateIsAdmin(id: number, is_admin: Boolean, i:number){
    if(!is_admin) {
      if (confirm("Retirer le rôle administrateur ?") == true) {
        this.as.updateIsAdmin(id, is_admin).subscribe();
        this.results[i].is_admin = is_admin;
      } else {
        this.results.reload();
      }
    } else{
      if (confirm("Donner le rôle administrateur ?") == true) {
        this.as.updateIsAdmin(id, is_admin).subscribe();
        this.results[i].is_admin = is_admin;
      } else {
        this.results.reload();
      }
    }
  }

  public updateEnabled(id:number, enabled: Boolean, i: number){
    if(!enabled){
      if (confirm("Désactiver le profil ?") == true) {
        this.as.updateEnabled(id, enabled).subscribe();
        this.results[i].enabled=false;
      }else{
        this.results.reload();
      }
    } else{
      if (confirm("Activer le profil ?") == true) {
        this.as.updateEnabled(id, enabled).subscribe();
        this.results[i].enabled=true;
      }else{
        this.results.reload();
      }
    }
  }
}
