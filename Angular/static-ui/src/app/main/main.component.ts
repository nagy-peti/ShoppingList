import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { ValidationService } from '../services/validation.service';
import { SerialNumberService } from '../services/serialNumber.service';

interface ItemList{
  [key:string]:ItemTuple[];
}
interface ItemTuple{
  name: string;
  qty: string;
  qtyType: string;
}

interface ListRow{
  id: number;
  items: any[]; //later itemtuple
  name: string;
  owner_id: number;
  recpies: any[]; //change later
  shared_with_friends: string;
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
  private subscription!: Subscription;
  private userId!: number;

  constructor(
    private backend: ValidationService,
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
        console.log(this.userId);
      }
    )
  }

  private getShoppingLists(){
    this.backend.getShoppingLists(this.userId).subscribe(
      (data) => {
        console.log(data);
        (<ListRow[]>data).forEach((element:ListRow) => {
          this.items[element.name] = element.items.map(item => {
            return {
              name: item.name,
              qty: item.quantity,
              qtyType: item.quantity_type
            }
          })
        })
        this.chosenTuple = this.items[Object.keys(this.items)[0]];
        this.chosenTupleName = Object.keys(this.items)[0];
        this.listTitles = Object.keys(this.items);
      }
    );
  }

  ngOnDestroy(){
    console.log('destroyed');
    this.subscription.unsubscribe();
  }

  onClickEvent(data:string):void{
    this.chosenTuple = this.items[data];
    this.chosenTupleName = data;
    this.showListTable = true;
  }

  addItem(){
    this.items[this.chosenTupleName].push({
      name: this.itemName, 
      qty: this.qty,
      qtyType: this.qtyType
    });
    this.chosenTuple = _.cloneDeep(this.items[this.chosenTupleName]);
    this.itemName = "";
    this.qty = "";
    this.qtyType = "";
  }

  deleteRow(data:ItemTuple){
    let index = this.items[this.chosenTupleName].findIndex(item => 
      item.name === data.name && item.qty === data.qty
    );
    this.items[this.chosenTupleName].splice(index,1);
    this.chosenTuple = _.cloneDeep(this.items[this.chosenTupleName]);
  }

  deleteList(data:string){
    if(this.editMode){
      delete this.items[data];
      this.listTitles = Object.keys(this.items);
      if(this.chosenTupleName === data){
        this.chosenTuple = this.items[Object.keys(this.items)[0]];
        this.chosenTupleName = Object.keys(this.items)[0];
      }
    }
  }

  addNewList(){
    this.items[this.listName]=<ItemTuple[]>[];
    this.chosenTuple = this.items[this.listName];
    this.chosenTupleName = this.listName;
    this.listTitles = _.cloneDeep(Object.keys(this.items));
    this.listName= "";
  }

  modifyRow(data:ItemTuple){
    this.itemName = data.name;
    this.qty = data.qty;
    this.qtyType = data.qtyType;
    this.deleteRow(data);
  }

}
