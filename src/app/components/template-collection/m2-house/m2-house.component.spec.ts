import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M2HouseComponent } from './m2-house.component';

describe('M2HouseComponent', () => {
  let component: M2HouseComponent;
  let fixture: ComponentFixture<M2HouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M2HouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(M2HouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
