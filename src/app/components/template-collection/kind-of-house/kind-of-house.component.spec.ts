import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindOfHouseComponent } from './kind-of-house.component';

describe('KindOfHouseComponent', () => {
  let component: KindOfHouseComponent;
  let fixture: ComponentFixture<KindOfHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindOfHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KindOfHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
