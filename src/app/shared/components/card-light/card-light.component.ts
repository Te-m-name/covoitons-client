import { Component, Input, OnInit } from '@angular/core';
import { RideInterface } from '../../interfaces/ride.interface';

@Component({
  selector: 'app-card-light',
  templateUrl: './card-light.component.html',
  styleUrls: ['./card-light.component.scss']
})
export class CardLightComponent implements OnInit {
  @Input() public ride!: RideInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
