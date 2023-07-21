import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractCombolistComponent } from './abstract-combolist.component';

describe('AbstractCombolistComponent', () => {
  let component: AbstractCombolistComponent;
  let fixture: ComponentFixture<AbstractCombolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractCombolistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbstractCombolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
