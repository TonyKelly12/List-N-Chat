import { TestBed, inject } from '@angular/core/testing';

import { DataModelServiceService } from './data-model-service.service';

describe('DataModelServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataModelServiceService]
    });
  });

  it('should be created', inject([DataModelServiceService], (service: DataModelServiceService) => {
    expect(service).toBeTruthy();
  }));
});
