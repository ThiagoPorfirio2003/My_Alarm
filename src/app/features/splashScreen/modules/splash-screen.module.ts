import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SplashScreenComponent } from '../components/splash-screen/splash-screen.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: 
  [
    SplashScreenComponent
  ],
  exports:
  [
    SplashScreenComponent
  ]
})
export class SplashScreenModule { }
