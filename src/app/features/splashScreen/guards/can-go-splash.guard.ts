import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';

export const canGoSplashGuard: CanActivateFn = (route, state) => {
  let utilsService : UtilsService;

  utilsService = inject(UtilsService)

  if(utilsService.splashScreenHasShown)
  {
      utilsService.changeRoute('/entry');
  }

  return !utilsService.splashScreenHasShown;
};
