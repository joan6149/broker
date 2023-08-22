import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindOfConstructionComponent } from './kind-of-construction.component';

describe('KindOfConstructionComponent', () => {
  let component: KindOfConstructionComponent;
  let fixture: ComponentFixture<KindOfConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindOfConstructionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KindOfConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
