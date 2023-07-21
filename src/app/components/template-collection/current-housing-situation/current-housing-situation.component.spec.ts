import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentHousingSituationComponent } from './current-housing-situation.component';

describe('CurrentHousingSituationComponent', () => {
  let component: CurrentHousingSituationComponent;
  let fixture: ComponentFixture<CurrentHousingSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentHousingSituationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentHousingSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
