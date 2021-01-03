import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerialNumberService {

  constructor() { }
  
  private serialNumberSource = new ReplaySubject<number>(1);
  public serialNumberReceived = this.serialNumberSource.asObservable();

  broadcastId(id: number){
    this.serialNumberSource.next(id);
  }
}
