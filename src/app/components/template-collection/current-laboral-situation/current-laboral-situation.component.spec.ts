import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLaboralSituationComponent } from './current-laboral-situation.component';

describe('CurrentLaboralSituationComponent', () => {
  let component: CurrentLaboralSituationComponent;
  let fixture: ComponentFixture<CurrentLaboralSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentLaboralSituationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentLaboralSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
