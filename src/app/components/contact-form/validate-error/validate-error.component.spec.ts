import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateErrorComponent } from './validate-error.component';

describe('ValidateErrorComponent', () => {
  let component: ValidateErrorComponent;
  let fixture: ComponentFixture<ValidateErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
