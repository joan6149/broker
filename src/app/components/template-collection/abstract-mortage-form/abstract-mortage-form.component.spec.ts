import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractMortageFormComponent } from './abstract-mortage-form.component';

describe('AbstractMortageFormComponent', () => {
  let component: AbstractMortageFormComponent;
  let fixture: ComponentFixture<AbstractMortageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractMortageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbstractMortageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
