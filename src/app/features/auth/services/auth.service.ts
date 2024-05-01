import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

   //public myUser! : UserModel;
   public isLogued : boolean;

   constructor(private auth : Auth) 
   { 
     this.isLogued = false;
   }
 
   /*
   public logMyUser(userLoged : UserModel)
   {
     this.myUser = userLoged;
     this.isLogued = true;
   }
 */
 
   /*
   public logIn(userAccessData : UserAccessData)
   {
     return signInWithEmailAndPassword(this.auth, userAccessData.email, userAccessData.password);
   }     
 
   public register(userAccessData : UserAccessData)
   {
     return createUserWithEmailAndPassword(this.auth, userAccessData.email, userAccessData.password)
   }
   */

   public getAuthUser()
   {
     return this.auth.currentUser;
   }
 
   public sendEmailVerification()
   {
     return sendEmailVerification(this.auth.currentUser!);
   }
 
   public signOut()
   {
     this.isLogued = false;
     //this.myUser = {} as UserModel;
     return signOut(this.auth);
   }
 
   /*
   public updateUserProfile(user : User, displayName : string, photoURL : string)
   {
     return updateProfile(user,{displayName, photoURL});
   }
   */
}
