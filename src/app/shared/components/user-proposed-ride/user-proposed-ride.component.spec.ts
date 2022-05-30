import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProposedRideComponent } from './user-proposed-ride.component';

describe('UserProposedRideComponent', () => {
  let component: UserProposedRideComponent;
  let fixture: ComponentFixture<UserProposedRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProposedRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProposedRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
