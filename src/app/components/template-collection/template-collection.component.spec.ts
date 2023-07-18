import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCollectionComponent } from './template-collection.component';

describe('TemplateCollectionComponent', () => {
  let component: TemplateCollectionComponent;
  let fixture: ComponentFixture<TemplateCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
