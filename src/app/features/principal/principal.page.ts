import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage{
  
  //public btnText : string;
  public isAlarmActivated! : boolean;
  public alarmStateTxt! : string;
  public screenBackgroundStyle! : string;
  public h1ColorStyle! : string;

  constructor(private utilsService : UtilsService) 
  { 
    this.desactivateAlarm();
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
        if(result.value.passwordIsCorrect)
        {
          this.desactivateAlarm();
        }
        else
        {
          console.log('Todo mal')
        }
      })
    }
    else
    {
      this.activateAlarm()
    }
  }

  private async validatePassword(password : string)
  {
    let retorno : any;

    retorno = {
      passwordIsCorrect: password == '123'
    }
    
    return retorno;
  }

  private activateAlarm()
  {
    this.isAlarmActivated = true
    this.screenBackgroundStyle = 'background-color: #70e000;'
    this.h1ColorStyle = 'color: #70e000;'
    this.alarmStateTxt = 'Alarma activada'
  }

  private desactivateAlarm()
  {
    this.isAlarmActivated =false;
    //this.btnText = 'Activar alarma';
    this.alarmStateTxt = 'Alarma desactivada'
    this.screenBackgroundStyle = 'background-color: #c1121f;'
    this.h1ColorStyle = 'color: #c1121f;'
  }
}
