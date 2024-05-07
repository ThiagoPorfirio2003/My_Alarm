import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './features/splashScreen/components/splash-screen/splash-screen.component';
import { canGoSplashGuard } from './features/splashScreen/guards/can-go-splash.guard';
import { canGoAuthGuard } from './features/auth/guards/can-go-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/pages/auth.module').then( m => m.AuthPageModule),
    canActivate: [canGoAuthGuard]
  },
  {
    path: 'splashScreen',
    component: SplashScreenComponent,
    canActivate: [canGoSplashGuard]
  },
  {
    path: '',
    redirectTo: 'splashScreen',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./features/principal/principal.module').then( m => m.PrincipalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
