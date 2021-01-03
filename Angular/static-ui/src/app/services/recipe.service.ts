import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Item } from './item.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    constructor(private http: HttpClient) {
    }
    getAll() {
        return this.http.get<Recipe[]>(baseUrl+'recipes/');
    }
    add(recipe: Recipe) {
        console.log(recipe)
        return this.http.post(baseUrl+'recipes/',recipe);
    }
    delete(id: number) {
        console.log(id)
        return this.http.delete(baseUrl+'recipes/'+id);
    }
    modify(recipe: Recipe) {
        console.log(recipe)
        return this.http.put(baseUrl+'recipes/'+recipe.id,recipe);
    }
}

export interface Recipe {
    id: number,
    name: string,
    items: Item[]
}
