import { TestBed, inject } from '@angular/core/testing';

import { GymService } from './gym.service';

describe('GymService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GymService]
    });
  });

  it('should be created', inject([GymService], (service: GymService) => {
    expect(service).toBeTruthy();
  }));
});
