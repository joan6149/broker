import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestOfertComponent } from './best-ofert.component';

describe('BestOfertComponent', () => {
  let component: BestOfertComponent;
  let fixture: ComponentFixture<BestOfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestOfertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestOfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
