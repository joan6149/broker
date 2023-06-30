import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMortgageComponent } from './new-mortgage.component';

describe('NewMortgageComponent', () => {
  let component: NewMortgageComponent;
  let fixture: ComponentFixture<NewMortgageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMortgageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
