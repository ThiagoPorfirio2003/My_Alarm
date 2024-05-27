import { Component, OnInit } from '@angular/core';
import { SplashScreenModule } from '../../../features/splashScreen/modules/splash-screen.module';
import { MyUser, MyUserAccessData } from 'src/app/core/models/user.model';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../../data/database.service';
import { MyStatus } from 'src/app/core/models/status.model';
import { MyForm } from 'src/app/core/models/form.model';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage{

  private fastAccessUsers : Array<MyUserAccessData>;
  public fastAccessUserSelected : MyUserAccessData;

  constructor(private utilsServices : UtilsService,
    private authService : AuthService,
    private databaseService : DatabaseService) 
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
    this.fastAccessUserSelected = {email: this.fastAccessUsers[userIndex].email, password: this.fastAccessUsers[userIndex].password}
  }

  public async receiveAccessData(userAccessData : MyForm<MyUserAccessData>)
  {
    if(userAccessData.status.success)
    {
      const loading = await this.utilsServices.getLoadingCtrl({spinner: 'circular'});
      const loginStatus : MyStatus = {message: {header:'ERROR'}, success: false};

      await loading.present();

      try
      {
        const userCredential = await this.authService.logIn(userAccessData.data);

        const doc = await this.databaseService.getDocRef('users', userCredential.user.uid);

        if(doc.exists())
        {
          loginStatus.success = true;
          this.authService.logMyUser(doc.data() as MyUser);
          this.fastAccessUserSelected = {email: '', password: ''};
          this.utilsServices.changeRoute('/principal');
        }
      }
      catch(error : any)
      {          
        loginStatus.message.header = this.utilsServices.translateAuthError(error.code);
      }
      finally
      {
        if(!loginStatus.success)
        {
          loading.dismiss();
          this.utilsServices.showSweet({title: loginStatus.message.header, text: loginStatus.message.content, background: '#023047',
            customClass: {title: 'primaryColor', confirmButton: 'sweetConfirm'}})
        }
        else
        {
          loading.dismiss();
        }
      }
    }
    else
    {  
      this.utilsServices.showSweet({title: userAccessData.status.message.header, text: userAccessData.status.message.content, position: 'top', timer: 3000,
         showConfirmButton: false, customClass: 'toast', toast: true, timerProgressBar: true, background: '#219EBC'
      });
    }
  }
}
