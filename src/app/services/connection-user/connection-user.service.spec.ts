import { TestBed } from '@angular/core/testing';

import { ConnectionUserService } from './connection-user.service';

describe('ConnectionUserService', () => {
  let service: ConnectionUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
