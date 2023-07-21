import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilStateComponent } from './civil-state.component';

describe('CivilStateComponent', () => {
  let component: CivilStateComponent;
  let fixture: ComponentFixture<CivilStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CivilStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CivilStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
