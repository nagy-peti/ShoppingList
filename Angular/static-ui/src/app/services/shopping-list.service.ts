import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ListRow } from '../main/main.component';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable()
export class ShoppingListService{

    constructor(private http:HttpClient){}

    getShoppingLists(userId:number){
        return this.http.get(baseUrl+'users/'+userId+'/shoppinglists');
    }

    addRow(rowToAdd:ListRow){
        return this.http.post(baseUrl+'shopping_list', rowToAdd, httpOptions);
    }

    deleteList(id:number){
        return this.http.delete(baseUrl+'shopping_list/'+id);
    }
}
