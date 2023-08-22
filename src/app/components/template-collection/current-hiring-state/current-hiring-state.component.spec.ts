import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentHiringStateComponent } from './current-hiring-state.component';

describe('CurrentHiringStateComponent', () => {
  let component: CurrentHiringStateComponent;
  let fixture: ComponentFixture<CurrentHiringStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentHiringStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentHiringStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
