import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractStepPageComponent } from './abstract-step-page.component';

describe('AbstractStepPageComponent', () => {
  let component: AbstractStepPageComponent;
  let fixture: ComponentFixture<AbstractStepPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractStepPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbstractStepPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
