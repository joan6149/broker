import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeAndExpensesFormArrayComponent } from './income-and-expenses-form-array.component';

describe('IncomeAndExpensesFormArrayComponent', () => {
  let component: IncomeAndExpensesFormArrayComponent;
  let fixture: ComponentFixture<IncomeAndExpensesFormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeAndExpensesFormArrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeAndExpensesFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
