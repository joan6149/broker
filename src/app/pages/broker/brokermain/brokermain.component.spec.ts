import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokermainComponent } from './brokermain.component';

describe('BrokermainComponent', () => {
  let component: BrokermainComponent;
  let fixture: ComponentFixture<BrokermainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokermainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokermainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
