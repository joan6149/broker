import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngressEgressMothlyComponent } from './ingress-egress-mothly.component';

describe('IngressEgressMothlyComponent', () => {
  let component: IngressEgressMothlyComponent;
  let fixture: ComponentFixture<IngressEgressMothlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngressEgressMothlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngressEgressMothlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
