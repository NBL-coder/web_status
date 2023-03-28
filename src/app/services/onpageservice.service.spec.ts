import { TestBed } from '@angular/core/testing';

import { OnpageserviceService } from './onpageservice.service';

describe('OnpageserviceService', () => {
  let service: OnpageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnpageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
