import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
import { SweetAlertResult } from 'sweetalert2';
import { PluginListenerHandle } from '@capacitor/core';
import { AccelListenerEvent, Motion } from '@capacitor/motion';
import { CapacitorFlash, CapacitorFlashPlugin } from '@capgo/capacitor-flash';
import { Haptics } from '@capacitor/haptics';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit, OnDestroy
{
  
  private XbufferSize: number;
  private XaccelerationBuffer: number[];
  private lastAcceleration! : number;

  public isAlarmActivated! : boolean;
  public alarmStateTxt! : string;
  public screenBackgroundStyle! : string;
  public h1ColorStyle! : string;
  public useX : boolean;
  public useRotate : boolean;

  private pathXSound! : string;
  private pathRotateSound! : string;
  /*
  private rightSideSound : HTMLAudioElement;
  private leftSideSound : HTMLAudioElement;
  private standUpSound : HTMLAudioElement;
  private standDownSound : HTMLAudioElement;
  private incorrectPassword : HTMLAudioElement;
  */
  private XAccelerationSound! : HTMLAudioElement;

  private accelHandle! : PluginListenerHandle;

  private repetAudio : boolean;

  private canMotion : boolean;

  constructor(private utilsService : UtilsService, private authService : AuthService) 
  { 
    this.XbufferSize = 3;
    this.XaccelerationBuffer = new Array<number>();
    this.lastAcceleration = 0;


    this.isAlarmActivated = false;
    this.desactivateAlarm();
    this.useRotate = true;
    this.useX = true;
    this.repetAudio = false;
    this.canMotion = true;

    /*
    this.rightSideSound = new Audio('../../../assets/audios/X/RightSide.m4a');
    this.leftSideSound = new Audio('../../../assets/audios/X/LeftSide.m4a');
    this.standUpSound = new Audio('../../../assets/audios/Stand/StandUp.m4a')
    this.standDownSound = new Audio('../../../assets/audios/Stand/StandDown.m4a');
    this.incorrectPassword = new Audio('../../../assets/audios/IncorrectPassword.m4a');
    */
  }

  ngOnInit(): void {
    Motion.addListener('accel', (e)=>
    {
      this.analyseAcceleration(e);
    })
    .then((accelHandle)=>
    {
      this.accelHandle = accelHandle;
    });
  }

  ngOnDestroy(): void 
  {
    this.accelHandle.remove();
  }

  private analyseAcceleration(accelListener :  AccelListenerEvent)
  {
    if(this.isAlarmActivated && this.canMotion)
      {
        if((accelListener.rotationRate.alpha > 100 || accelListener.rotationRate.alpha < -100) && this.useRotate)
        {
          this.useRotate = false;
          if(accelListener.rotationRate.alpha > 100)
          {
            CapacitorFlash.toggle();
            setTimeout(()=>
            {
              CapacitorFlash.toggle();
            },5000)

            this.pathRotateSound = '../../../assets/audios/Stand/StandUp.m4a'
          }
          else
          {
            Haptics.vibrate({duration: 5000});
            this.repetAudio = true;
            this.pathRotateSound = '../../../assets/audios/Stand/StandDown.m4a'
          }

          (new Audio(this.pathRotateSound)).play();

          if(this.repetAudio)
          {
            setTimeout(()=>
            {
              (new Audio(this.pathRotateSound)).play();
              this.repetAudio = false;
            }, 2400)
            
          }
        }
        else
        {
          if(accelListener.rotationRate.alpha < 30 && accelListener.rotationRate.alpha > -30)
          {
            this.useRotate = true;
          }

          const smoothedXAcceleration = this.smoothData(accelListener.acceleration.x, this.XaccelerationBuffer, this.XbufferSize);

          if((smoothedXAcceleration > 5 || smoothedXAcceleration < -5) && this.useX)
          {
            this.useX = false;
            if(smoothedXAcceleration > 5)
              {
                this.pathXSound = '../../../assets/audios/X/LeftSide.m4a';
              }
              else
              {
                this.pathXSound = '../../../assets/audios/X/RightSide.m4a';
              }

              (new Audio(this.pathXSound)).play();
          }
          else
          {
            if(smoothedXAcceleration == 0)
            {
              this.useX = true;
            }
          }

          /*
          if(smoothedXAcceleration == 0)
          {
            if(this.lastAcceleration != 0)
            {
              (new Audio(this.pathXSound)).play()
              this.lastAcceleration = 0;
            }
          }
          else
          {
            if(smoothedXAcceleration > 5 || smoothedXAcceleration < -5)
            {
              if(smoothedXAcceleration > 5)
              {
                this.pathXSound = '../../../assets/audios/X/LeftSide.m4a';
              }
              else
              {
                this.pathXSound = '../../../assets/audios/X/RightSide.m4a';
              }
              this.lastAcceleration = smoothedXAcceleration;
            }
          }
          */
        }
      }
  }


  private smoothData(acceleration: number, buffer : Array<number>, bufferSize : number): number 
  {
    buffer.push(acceleration);

    if(buffer.length > bufferSize) 
    {
      buffer.shift();
    }

    const sum = buffer.reduce((a, b) => a + b, 0);
    return sum / buffer.length;
  }

  public changeAlarmState()
  {
    if(this.isAlarmActivated)
    {
      this.utilsService.showSweet({title:'Ingresa tu clave para desactivar la alarma',
      input: "password",
      allowOutsideClick: false,
      confirmButtonText: 'Aceptar', confirmButtonColor: '#219EBC',
      customClass: {
        title: 'sweetTitle',
        confirmButton: 'sweetConfirm',
        denyButton: 'sweetDeny',
      },
      preConfirm: this.validatePassword
      })
      .then((result)=>
      {
        if(result.value.isPassword)
        {
          this.authService.logIn({email: this.authService.myUser.email, password : result.value.password})
          .then(()=>this.desactivateAlarm())
          .catch(()=>
          {
            this.canMotion = false;
            (new Audio('../../../assets/audios/IncorrectPassword.m4a')).play();
            
            CapacitorFlash.toggle();
            
            setTimeout(()=>
            {
              CapacitorFlash.toggle();
              this.canMotion = true;
            },5000);
  
            Haptics.vibrate({duration: 5000});
            
            for (let index = 1; index < 4; index++) 
            {
              setTimeout(()=>
              {
                (new Audio('../../../assets/audios/IncorrectPassword.m4a')).play();
              },index * 1200);
            }
          })
        }
      })
    }
    else
    {
      this.activateAlarm()
    }
  }

  private validatePassword(password : string)
  {
    return {
      isPassword : true,
      password : password
    }
  }

  private activateAlarm()
  {
    this.isAlarmActivated = true
    this.screenBackgroundStyle = 'background-color: #c1121f;'
    this.h1ColorStyle = 'color: #c1121f;'
    this.alarmStateTxt = 'Alarma activada'
  }

  private desactivateAlarm()
  {
    this.isAlarmActivated =false;
    //this.btnText = 'Activar alarma';
    this.alarmStateTxt = 'Alarma desactivada'
    this.screenBackgroundStyle = 'background-color: #70e000;'
    this.h1ColorStyle = 'color: #70e000;'
  }
}
