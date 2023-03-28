import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnpageserviceService {

  constructor() { }
  public static isAuthenticated:BehaviorSubject<string> = new BehaviorSubject<string>("0");
}
