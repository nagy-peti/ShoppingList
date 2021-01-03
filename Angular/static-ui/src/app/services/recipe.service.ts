import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'http://shopping-list-fswp.herokuapp.com/recipes';  
  constructor(private http:HttpClient) {
    
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  add(recipe: Recipe):void {
    console.log(recipe)
  }
  delete(id:number){
    console.log(id)
  }
  modify(recipe: Recipe){
    console.log(recipe)
  }
}


export interface Recipe {
  id: number,
  name: string,
  items: Item[]
} 




/*this.recipes =
    [{
      id: 1,
      name: "recipe1",
      items: [{
        name: "item1",
        quantity_type: "db",
        quantity: 10,
        id: 1,
        shopping_list_id: null,
        recipe_id: 1
      }, {
        name: "item2",
        quantity_type: "db",
        quantity: 10,
        id: 1,
        shopping_list_id: null,
        recipe_id: 1
      }, {
        name: "idtem2",
        quantity_type: "db",
        quantity: 10,
        id: 1,
        shopping_list_id: null,
        recipe_id: 1
      }, {
        name: "itasdem2",
        quantity_type: "db",
        quantity: 10,
        id: 1,
        shopping_list_id: null,
        recipe_id: 1
      }, {
        name: "itasdasem2",
        quantity_type: "db",
        quantity: 10,
        id: 1,
        shopping_list_id: null,
        recipe_id: 1
      }, {
        name: "itdasdem2",
        quantity_type: "db",
        quantity: 10,
        id: 1,
        shopping_list_id: null,
        recipe_id: 1
      }, {
        name: "itasdem2",
        quantity_type: "db",
        quantity: 10,
        id: 1,
        shopping_list_id: null,
        recipe_id: 1
      }, {
        name: "itemasd2",
        quantity_type: "db",
        quantity: 10,
        id: 1,
        shopping_list_id: null,
        recipe_id: 1
      }, {
        name: "iteasdasm2",
        quantity_type: "db",
        quantity: 10,
        id: 1,
        shopping_list_id: null,
        recipe_id: 1
      }, {
        name: "itemitemitem3",
        quantity_type: "liter",
        quantity: 1,
        id: 1,
        shopping_list_id: null,
        recipe_id: 1
      }
      ]
    },
    {
      id: 2,
      name: "recipe2",
      items: [
        {
          name: "n1",
          quantity_type: "db",
          quantity: 10,
          id: 1,
          shopping_list_id: null,
          recipe_id: 2
        }]
    },
    {
      id: 3,
      name: "recipe3",
      items: [
        {
          id: 1,
          shopping_list_id: null,
          recipe_id: 3,
          name: "n1",
          quantity_type: "db",
          quantity: 10,
        }]
    }]*/