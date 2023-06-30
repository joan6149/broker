import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndOrColectiveComponent } from './ind-or-colective.component';

describe('IndOrColectiveComponent', () => {
  let component: IndOrColectiveComponent;
  let fixture: ComponentFixture<IndOrColectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndOrColectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndOrColectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
