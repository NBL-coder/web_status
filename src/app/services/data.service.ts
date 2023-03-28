import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { from } from 'rxjs';

const STORAGE_KEY = 'weblist';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private storageReady = new BehaviorSubject(false);
  constructor( private storage:Storage) {
    this.init();
   }

   async init(){
    await this.storage.defineDriver(cordovaSQLiteDriver);
    await this.storage.create();
    console.log("DONE");  
    this.storageReady.next(true);
   }

   getData(){
    return this.storageReady.pipe(
      filter(ready => ready),
      switchMap(_ => {
        return from(this.storage.get(STORAGE_KEY) || []);
      })
    )
   }

   async addData(item:any){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
   }

   async removeData(index:any){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index,1);
    return this.storage.set(STORAGE_KEY, storedData);
   }
   async updateData(index:any,item:any){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData[index] = item;
    return this.storage.set(STORAGE_KEY, storedData);
   }
}
