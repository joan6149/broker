import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsAvalComponent } from './is-aval.component';

describe('IsAvalComponent', () => {
  let component: IsAvalComponent;
  let fixture: ComponentFixture<IsAvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsAvalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsAvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
