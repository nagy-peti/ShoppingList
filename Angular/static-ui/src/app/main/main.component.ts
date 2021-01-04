import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';
import { SerialNumberService } from '../services/serialNumber.service';
import { ItemService } from '../services/item.service';
import { ShoppingListService } from '../services/shopping-list.service';

interface ItemList{
  [key:string]:ItemTuple[];
}

interface Map{
  [key:string]:number;
}

interface BooleanMap{
  [key:string]:boolean;
}

export interface ItemTuple{
  shopping_list_id: number;
  id?:number;
  name: string;
  quantity: string;
  quantity_type: string;
  owner_id:number;
}

export interface ListRow{
  id?: number;
  items: any[];
  name: string;
  owner_id: number;
  recpies?: any[];
  shared_with_friends: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  lodash = _;

  public showListTable: boolean = false;
  public displayedColumns: string[] = ['name','quantity'];
  public chosenTuple: ItemTuple[] = [];
  public chosenTupleName: string = "";
  public itemName: string = "";
  public qty: string = "";
  public qtyType: string = "";
  public editMode: boolean = false;
  public listTitles: string[] = [];
  public listName: string = "";
  public items: ItemList = {};
  public isShared: boolean = false;
  public isOwned: BooleanMap= {};
  
  private subscription!: Subscription;
  private userId!: number;
  private shoppingListIds:Map = {};

  constructor(
    private usersService: UsersService,
    private itemService: ItemService,
    private shoppingListService: ShoppingListService,
    private serialNumber: SerialNumberService
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.showListTable = true;
  }

  private getUserId(){
    this.subscription = this.serialNumber.serialNumberReceived.subscribe(
      data => {
        this.userId = data;
        this.getShoppingLists();
      }
    )
  }

  private getShoppingLists(){
    this.usersService.getShoppingLists(this.userId).subscribe(
      (data) => {
        console.log(data);
        (<ListRow[]>data).forEach((element:ListRow) => {
          this.items[element.name] = <any[]>element.items.map(item => {
            return <ItemTuple>{
              shopping_list_id: item.shopping_list_id,
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              quantity_type: item.quantity_type
            }
          })
          this.shoppingListIds[element.name] = <number>element.id;
          this.isOwned[element.name] = this.userId === element.owner_id;
        })
        this.chosenTuple = this.items[Object.keys(this.items)[0]];
        this.chosenTupleName = Object.keys(this.items)[0];
        this.listTitles = Object.keys(this.items);
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClickEvent(data:string):void{
    this.chosenTuple = this.items[data];
    this.chosenTupleName = data;
    this.showListTable = true;
  }

  addItem(){
    let itemToAdd = <ItemTuple>{
      shopping_list_id: this.shoppingListIds[this.chosenTupleName],
      name: this.itemName,
      quantity: this.qty,
      quantity_type: this.qtyType
    };
    this.itemService.addItem(itemToAdd).subscribe(
      data => {
        itemToAdd.id = (<any>data).id;
        this.items[this.chosenTupleName].push(itemToAdd);
        this.chosenTuple = _.cloneDeep(this.items[this.chosenTupleName]);
      }
    );
    this.itemName = "";
    this.qty = "";
    this.qtyType = "";
  }

  deleteRow(data:ItemTuple){
    this.itemService.deleteItem(<number>data.id).subscribe(
      () => {
        let index = this.items[this.chosenTupleName].findIndex(item => 
          item.name === data.name && item.quantity === data.quantity
        );
        this.items[this.chosenTupleName].splice(index,1);
        this.chosenTuple = _.cloneDeep(this.items[this.chosenTupleName]);
      }
    )
  }

  deleteList(data:string){
    if(this.editMode){
      this.shoppingListService.deleteList(this.shoppingListIds[data]).subscribe(
        msg => {
          delete this.items[data];
          this.listTitles = Object.keys(this.items);
          if(this.chosenTupleName === data){
            this.chosenTuple = this.items[Object.keys(this.items)[0]];
            this.chosenTupleName = Object.keys(this.items)[0];
          }
        }
      )
    }
  }

  addNewList(){
    let rowToAdd = <ListRow>{
      id: undefined,
      items: [],
      name: this.listName,
      owner_id: this.userId,
      shared_with_friends: this.isShared
    }
    this.shoppingListService.addRow(rowToAdd).subscribe(
      data => {
        this.shoppingListIds[this.listName] = (<any>data).id;
        this.isOwned[this.listName] = (<any>data).true;
        this.items[this.listName]=<ItemTuple[]>[];
        this.chosenTuple = this.items[this.listName];
        this.chosenTupleName = this.listName;
        this.listTitles = _.cloneDeep(Object.keys(this.items));
        this.listName= "";
      }
    )
    this.isShared = false;
  }

  modifyRow(data:ItemTuple){
    this.itemName = data.name;
    this.qty = data.quantity;
    this.qtyType = data.quantity_type;
    this.deleteRow(data);
  }
}
