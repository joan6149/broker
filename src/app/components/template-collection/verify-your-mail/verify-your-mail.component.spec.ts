import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyYourMailComponent } from './verify-your-mail.component';

describe('VerifyYourMailComponent', () => {
  let component: VerifyYourMailComponent;
  let fixture: ComponentFixture<VerifyYourMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyYourMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyYourMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
