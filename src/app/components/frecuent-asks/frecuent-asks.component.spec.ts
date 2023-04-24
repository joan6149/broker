import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrecuentAsksComponent } from './frecuent-asks.component';

describe('FrecuentAsksComponent', () => {
  let component: FrecuentAsksComponent;
  let fixture: ComponentFixture<FrecuentAsksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrecuentAsksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrecuentAsksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
