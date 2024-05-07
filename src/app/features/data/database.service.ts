import { Injectable, inject } from '@angular/core';
import { setDoc, doc, Firestore, getDoc, collection, runTransaction, query, getDocs, limit, where, DocumentReference } 
from '@angular/fire/firestore';
import { CollectionName } from 'src/app/core/MyTypes/collectionsNames';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public firestore : Firestore;

  private readonly DEFAULT_USER_IMAGE_URL : string = `https://firebasestorage.googleapis.com/v0/b/mymag-dac6f.appspot.com/o/images%2Fusers%2Fdefault.png?alt=media&token=45927b60-3dd3-4be4-80f2-e6cafe8573a9`
  private readonly DEFAULT_USER_IMAGE_PATH : string = '/images/users/default.png';

  public readonly USERS_COLLECTION_NAME : CollectionName = 'users';
  //public readonly UNIQUE_USER_NAMES_COLLETION_NAME : string = 'uniqueUserNames';

  constructor() 
  { 
    this.firestore = inject(Firestore);
  }

  public getDocRef(collectionName : CollectionName, idDoc : string)
  {
    return getDoc(doc(this.firestore, collectionName, idDoc));
  }

  
  public saveData(collectionName : CollectionName, data : any, id? : string)
  {
    let docRef;

    if(id)
    {
      //docRef = doc(this.firestore, `${collectionName}/${id}`);
      docRef = doc(this.firestore, collectionName, id);
    }
    else
    {   
      docRef = doc(this.firestore, collectionName);
      data.id = docRef.id;
    }

    return setDoc(docRef, data);
  }
  
  /*
  public async saveNewUserData(newUser : UserModel) : Promise<UserModel>
  {
    let error : unknown;
    if(newUser.image.path == '' || newUser.image.url == '')
    {
      newUser.image.path = this.DEFAULT_USER_IMAGE_PATH;
      newUser.image.url = this.DEFAULT_USER_IMAGE_URL;
    }

    try
    {
      await this.saveNewUser(newUser);
    }
    catch(e)
    {
      error = e;  
    }

    return new Promise((resolve, reject)=>
    {
      if(error)
      {
        reject(error)
      }
      else
      {
        resolve(newUser);
      }
    });
  }
  

  private async saveNewUser(newUser : UserModel)
  {
    try 
    {
      await runTransaction(this.firestore, async (transaction) => 
      {
        const docUserNameRef = doc(this.firestore, this.UNIQUE_USER_NAMES_COLLETION_NAME + `/${newUser.userName}`);
        const docUserNameSnap =  await transaction.get(docUserNameRef)
        
        if(docUserNameSnap.exists()) 
        {
          const messageError : MyStatus = {header: 'Nombre ya usado', message: 'Eliga otro nombre de usuario', success: false}
          throw messageError;
        } 
        else 
        {
          transaction.set(docUserNameRef, {used : true});
          transaction.set(doc(this.firestore,this.USERS_COLLECTION_NAME, newUser.uid), newUser);
        }
      });      
    } 
    catch (e) 
    {
      throw e;
    }
  }
  */
}
