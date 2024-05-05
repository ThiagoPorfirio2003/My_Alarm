import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: 
  [
    CustomInputComponent,
    HeaderComponent
  ],
  imports: 
  [
    CommonModule,
    IonicModule
  ],
  exports:
  [
    CustomInputComponent,
    HeaderComponent
  ]
})
export class SharedComponentsModule { }
