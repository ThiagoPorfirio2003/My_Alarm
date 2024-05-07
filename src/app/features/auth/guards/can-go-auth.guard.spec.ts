import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canGoAuthGuard } from './can-go-auth.guard';

describe('canGoAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canGoAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
