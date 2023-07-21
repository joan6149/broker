import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonsComponent } from './sons.component';

describe('SonsComponent', () => {
  let component: SonsComponent;
  let fixture: ComponentFixture<SonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
