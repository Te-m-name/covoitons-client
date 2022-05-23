import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookedRideComponent } from './user-booked-ride.component';

describe('UserBookedRideComponent', () => {
  let component: UserBookedRideComponent;
  let fixture: ComponentFixture<UserBookedRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookedRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookedRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
