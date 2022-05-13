import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() public user!: User | null;
  @Output() public logout: EventEmitter<true> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
