import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemTuple } from '../main/main.component';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) { }

  deleteItem(id:number){
    return this.http.delete(baseUrl+'items/'+id);
}

addItem(itemToAdd:ItemTuple){
    return this.http.post(baseUrl+'items', itemToAdd, httpOptions);
}

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