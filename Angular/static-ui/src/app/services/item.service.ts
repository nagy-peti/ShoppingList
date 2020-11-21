import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  
  add(item:Item) {
    console.log(item)
  }
  delete(id:number){
    console.log("deleting:",id)
    
  }
  modify(item: Item){
    console.log(item)
  }
}


export interface Item {
  id: number;
  shopping_list_id: number | null;
  recipe_id: number | null;
  name: string;
  quantity: number;
  quantity_type: string;
}