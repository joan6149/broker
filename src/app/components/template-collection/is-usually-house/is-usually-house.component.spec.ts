import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsUsuallyHouseComponent } from './is-usually-house.component';

describe('IsUsuallyHouseComponent', () => {
  let component: IsUsuallyHouseComponent;
  let fixture: ComponentFixture<IsUsuallyHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsUsuallyHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsUsuallyHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
