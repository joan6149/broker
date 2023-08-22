import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToGoMainViewComponent } from './ready-to-go-main-view.component';

describe('ReadyToGoMainViewComponent', () => {
  let component: ReadyToGoMainViewComponent;
  let fixture: ComponentFixture<ReadyToGoMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyToGoMainViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyToGoMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
