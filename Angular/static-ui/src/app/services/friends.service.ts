import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { SerialNumberService } from './serialNumber.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  
  constructor(private http:HttpClient){}
  
  getUserFriends(userId:number){
    return this.http.get<User[]>(baseUrl+'users/'+userId+'/friends');
  }
  add(userId:number,friendName: string) {
    console.log(friendName)
    return this.http.post(baseUrl+'users/'+userId+'/addFriend',friendName);
  }
}

export interface User{
  id:number,
  username:string
}