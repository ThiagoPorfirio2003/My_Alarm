import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { AuthModule } from '../auth.module';
import { SharedComponentsModule } from 'src/app/core/sharedComponents/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule, 
    AuthModule,
    SharedComponentsModule
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
