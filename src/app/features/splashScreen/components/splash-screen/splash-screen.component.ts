import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent
{
  public splashScreenClass : string;
  public showText : boolean;
  public splashScreenStyle : string;

  constructor(private utilsService : UtilsService,
    private platform : Platform)
    {
      this.splashScreenClass = 'scale-out-horizontal';
      this.showText = false;
      this.splashScreenStyle = 'justify-content: center';
    }

    ionViewDidEnter()
    {
      if(!this.utilsService.splashScreenHasShown)
      {
        this.platform.ready().then(() => 
        {
          this.utilsService.splashScreenHasShown = true;
          SplashScreen.hide().then(()=>
          {
            setTimeout(()=>
            {
              this.splashScreenStyle = 'justify-content: normal'
              this.splashScreenClass = 'scale-in-hor-center';
              this.showText = true;
            }, 700)


            setTimeout(() => 
            {
           //   this.utilsService.changeRoute('/auth')
            }, 3000);
          })
        });
      }
    }  
}
