import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './features/splashScreen/components/splash-screen/splash-screen.component';
import { canGoSplashGuard } from './features/splashScreen/guards/can-go-splash.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/pages/auth.module').then( m => m.AuthPageModule)
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
