import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaxDataComponent } from './new-tax-data.component';

describe('NewTaxDataComponent', () => {
  let component: NewTaxDataComponent;
  let fixture: ComponentFixture<NewTaxDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTaxDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaxDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
