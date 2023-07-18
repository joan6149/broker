import { TestBed } from '@angular/core/testing';

import { TemplateCollectionService } from './template-collection.service';

describe('TemplateCollectionService', () => {
  let service: TemplateCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
