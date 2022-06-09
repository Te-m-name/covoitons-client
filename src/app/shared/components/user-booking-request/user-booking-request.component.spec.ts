import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingRequestComponent } from './user-booking-request.component';

describe('UserBookingRequestComponent', () => {
  let component: UserBookingRequestComponent;
  let fixture: ComponentFixture<UserBookingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
