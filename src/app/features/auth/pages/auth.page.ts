import { Component, OnInit } from '@angular/core';
import { SplashScreenModule } from '../../../features/splashScreen/modules/splash-screen.module';
import { MyUserAccessData } from 'src/app/core/models/user.model';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage{

  private fastAccessUsers : Array<MyUserAccessData>;
  public fastAccessUserSelected : MyUserAccessData;

  constructor() 
  { 
    this.fastAccessUsers = 
    [
      {email: 'admin@admin.com', password: '111111'},
      {email: 'invitado@invitado.com', password: '222222'},
      {email: 'usuario@usuario.com', password: '333333'},
      {email: 'anonimo@anonimo.com', password: '444444'},
      {email: 'tester@tester.com', password: '555555'},
    ]

    this.fastAccessUserSelected = {email: '', password: ''};
  }

  public changeFastAccessUserSelected(userIndex : number)
  {
    this.fastAccessUserSelected = this.fastAccessUsers[userIndex];
  }

}
