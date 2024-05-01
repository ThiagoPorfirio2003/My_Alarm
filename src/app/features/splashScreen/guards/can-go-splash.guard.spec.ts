import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canGoSplashGuard } from './can-go-splash.guard';

describe('canGoSplashGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canGoSplashGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
