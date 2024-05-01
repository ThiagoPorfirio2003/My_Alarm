import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, LoadingOptions, SpinnerTypes } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public splashScreenHasShown : boolean;

  constructor(//private toastController : ToastController, 
    //private alertController : AlertController,
    private loadingController : LoadingController,
    private router : Router) 
    { 
      this.splashScreenHasShown = false;
    }

    /*
  public getToast(toastOptions : ToastOptions)
  {
    return this.toastController.create(toastOptions);
  }

  public showToast(toastOptions : ToastOptions)
  {
    this.getToast(toastOptions)
    .then((toast)=> toast.present())
  }

  public getAlert(alertOptions : AlertOptions)
  {
    return this.alertController.create(alertOptions)
  }
   
  public showAlert(alertOptions : AlertOptions)
  {
    this.getAlert(alertOptions)
    .then((ale)=> ale.present())
  }
  */
  public getLoadingCtrl(options: LoadingOptions)
  {
    return this.loadingController.create(options)
  }


  public changeRoute(newRoute : string)
  {
    this.router.navigate([newRoute]);
  }

  public getRoute()
  {
    return this.router.url;
  }

  public translateAuthError(errorMessage : string) : string
  {
    let errorMessageTranslated : string;
    
    switch(errorMessage)
    {
      case "auth/invalid-email": 
        errorMessageTranslated = "El mail no es valido";
      break;

      case "auth/email-already-in-use": 
        errorMessageTranslated = "El mail ya pertenece a otro usuario";
      break;

      case "auth/weak-password":       
        errorMessageTranslated = "La clave debe de tener mas de 6 caracteres";
      break;

      case "auth/missing-password": 
        errorMessageTranslated = "No se ingreso la clave";
      break;

      case "auth/invalid-credential": 
        errorMessageTranslated = "Los datos no pertenecen ningun usuario";
      break;

      default:
        errorMessageTranslated = errorMessage;
      break;
    }

    return errorMessageTranslated;
  }
}
