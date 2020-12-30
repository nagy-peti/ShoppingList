import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor() { }

  
  getUserFriends():User[] {
    return [
      {id: 1, name:"name1"},
      {id: 2, name:"namename2"},
      {id: 3, name:"namenamename3"},
      {id: 4, name:"namename4"},
      {id: 5, name:"namnamee5"},
      {id: 6, name:"name6"},
    ]
  }
  add(friendName: string):void {
    console.log(friendName)
  }
}

export interface User{
  id:number,
  name:string
}