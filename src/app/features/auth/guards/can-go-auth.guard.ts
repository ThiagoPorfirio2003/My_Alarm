import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AuthService } from '../services/auth.service';

export const canGoAuthGuard: CanActivateFn = (route, state) => {

  let authService : AuthService;

  authService = inject(AuthService);

  if(authService.isLogued)
  {
    inject(UtilsService).changeRoute('/navigation-tabs');
  }

  return !authService.isLogued;
};
