import { Component, OnInit } from '@angular/core';
import { RideInterface } from 'src/app/shared/interfaces/ride.interface';
import { RidesService } from 'src/app/shared/services/rides.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public rides!: [RideInterface];

  constructor(private ridesService: RidesService) { }

  ngOnInit(): void {
  }

  public getRides() {
    this.ridesService.getRides().subscribe(data => this.rides = data)
  }

}
