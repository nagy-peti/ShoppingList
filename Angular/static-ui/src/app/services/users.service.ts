import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable()
export class UsersService{

    constructor(private http:HttpClient){}

    getVerification(username: string, password: string){
        return this.http.get(baseUrl+'/users/auth',{params:{username:username, password:password}});
    }

    addNewUser(username: string, password: string){
        return this.http.post(baseUrl+'/users/register',{username:username, password:password}, httpOptions);
    }

    getShoppingLists(userId:number){
        return this.http.get(baseUrl+'users/'+userId+'/shoppinglists');
    }
}
