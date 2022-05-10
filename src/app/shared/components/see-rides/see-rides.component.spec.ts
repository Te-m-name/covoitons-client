import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeRidesComponent } from './see-rides.component';

describe('SeeRidesComponent', () => {
  let component: SeeRidesComponent;
  let fixture: ComponentFixture<SeeRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeRidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
