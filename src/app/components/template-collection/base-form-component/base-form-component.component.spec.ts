import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseForm } from './base-form';

describe('BaseFormComponentComponent', () => {
  let component: BaseForm;
  let fixture: ComponentFixture<BaseForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseForm ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
