import { TestBed, inject } from '@angular/core/testing';

import { HttpclientserverService } from './httpclientserver.service';

describe('HttpclientserverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpclientserverService]
    });
  });

  it('should be created', inject([HttpclientserverService], (service: HttpclientserverService) => {
    expect(service).toBeTruthy();
  }));
});
