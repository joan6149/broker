import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyHouseValueComponent } from './property-house-value.component';

describe('PropertyHouseValueComponent', () => {
  let component: PropertyHouseValueComponent;
  let fixture: ComponentFixture<PropertyHouseValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyHouseValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyHouseValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
