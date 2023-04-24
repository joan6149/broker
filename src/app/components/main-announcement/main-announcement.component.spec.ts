import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAnnouncementComponent } from './main-announcement.component';

describe('MainAnnouncementComponent', () => {
  let component: MainAnnouncementComponent;
  let fixture: ComponentFixture<MainAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
