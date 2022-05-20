import { Component, Input, OnInit } from '@angular/core';
import { RidesService } from 'src/app/shared/services/rides.service';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {

  @Input()
  public user: any;

  public ride: any;

  constructor(private service: RidesService) { }

  ngOnInit(): void {
    this.getRide();
  }

  public getRide() {
    this.service.getNextRide(this.user.id).subscribe(data => {
      this.ride = data;
    })
  }

}
