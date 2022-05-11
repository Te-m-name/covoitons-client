import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeARideComponent } from './see-a-ride.component';

describe('SeeARideComponent', () => {
  let component: SeeARideComponent;
  let fixture: ComponentFixture<SeeARideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeARideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeARideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
