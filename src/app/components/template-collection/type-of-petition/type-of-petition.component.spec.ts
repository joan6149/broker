import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfPetitionComponent } from './type-of-petition.component';

describe('TypeOfPetitionComponent', () => {
  let component: TypeOfPetitionComponent;
  let fixture: ComponentFixture<TypeOfPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfPetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
