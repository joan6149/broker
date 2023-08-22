import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsRequestedAnotherBancsComponent } from './is-requested-another-bancs.component';

describe('IsRequestedAnotherBancsComponent', () => {
  let component: IsRequestedAnotherBancsComponent;
  let fixture: ComponentFixture<IsRequestedAnotherBancsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsRequestedAnotherBancsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsRequestedAnotherBancsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
