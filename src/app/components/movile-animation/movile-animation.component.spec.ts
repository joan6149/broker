import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovileAnimationComponent } from './movile-animation.component';

describe('MovileAnimationComponent', () => {
  let component: MovileAnimationComponent;
  let fixture: ComponentFixture<MovileAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovileAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovileAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
