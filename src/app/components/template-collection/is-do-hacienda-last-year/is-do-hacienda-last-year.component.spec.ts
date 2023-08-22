import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsDoHaciendaLastYearComponent } from './is-do-hacienda-last-year.component';

describe('IsDoHaciendaLastYearComponent', () => {
  let component: IsDoHaciendaLastYearComponent;
  let fixture: ComponentFixture<IsDoHaciendaLastYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsDoHaciendaLastYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsDoHaciendaLastYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
