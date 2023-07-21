import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOfResidenceComponent } from './country-of-residence.component';

describe('CountryOfResidenceComponent', () => {
  let component: CountryOfResidenceComponent;
  let fixture: ComponentFixture<CountryOfResidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryOfResidenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryOfResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
