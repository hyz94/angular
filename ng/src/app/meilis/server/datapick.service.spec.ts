import { TestBed, inject } from '@angular/core/testing';

import { DatapickService } from './datapick.service';

describe('DatapickService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatapickService]
    });
  });

  it('should be created', inject([DatapickService], (service: DatapickService) => {
    expect(service).toBeTruthy();
  }));
});
