import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitDataFormAppComponent } from './init-data-form.component';

describe('InitDataFormComponent', () => {
  let component: InitDataFormAppComponent;
  let fixture: ComponentFixture<InitDataFormAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitDataFormAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitDataFormAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
