import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

interface ItemList{
  [key:string]:ItemTuple[];
}
interface ItemTuple{
  name: string;
  quantity: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public showListTable: boolean = false;
  public displayedColumns: string[] = ['name','quantity'];
  public chosenTuple: ItemTuple[] = [];
  public chosenTupleName: string = "";
  public itemName: string = "";
  public quantity: string = "";
  public unit: string = "";
  public editMode: boolean = false;
  public listTitles: string[] = [];
  public listName: string = "";
  public items: ItemList = {
    Party:[
      {name:'Nacho', quantity:'2 bags'},
      {name:'Nacho Dip', quantity:'2 jars'},
      {name:'Fanta Orange', quantity:'3 bottles'},
      {name:'Beer', quantity:'24 bottles'},
      {name:'Wine', quantity:'10 bottles'},
      {name:'Vodka', quantity:'1 bottle'},
      {name:'Whiskey', quantity:'1 bottle'},
      {name:'Frozen Pizza', quantity:'5 pieces'}
    ],
    Groceries: [
      {name:'Bread', quantity:'1 loaf'},
      {name:'Butter', quantity:'500g'},
      {name:'Ham', quantity:'1 loaf'},
      {name:'Eggs', quantity:'1 loaf'},
      {name:'Toilet paper', quantity:'12 rolls'},
      {name:'Deodorant', quantity:'1'},
      {name:'Bread', quantity:'1 loaf'},
    ],
    Netflix:[
      {name:'Beer', quantity:'3 bottles'},
      {name:'Chips', quantity:'2 bags'},
      {name:'Gummibears', quantity:'1 bag'},
    ],
    Hiking:[
      {name:'Water', quantity:'3 bottles'},
      {name:'Chocolate', quantity:'6 bars'},
      {name:'Tea', quantity:'1 box'},
      {name:'Heating gel', quantity:'4 pieces'},
    ],
    Utilities:[
      {name:'Floraszept', quantity:'1 bottle'},
      {name:'Garbage bags', quantity:'2 rolls'},
      {name:'Toilet paper', quantity:'24 rolls'},
      {name:'Aerosol', quantity:'1 bottle'},
      {name:'Sponge', quantity:'10 pieces'},
      {name:'Washing gel', quantity:'1 bottle'},
    ],
  };

  constructor( ) { }

  ngOnInit(): void {
    this.chosenTuple = this.items['Party'];
    this.chosenTupleName = 'Party';
    this.showListTable = true;
    this.listTitles = Object.keys(this.items);
  }

  onClickEvent(data:string):void{
    this.chosenTuple = this.items[data];
    this.chosenTupleName = data;
    this.showListTable = true;
  }

  addItem(){
    this.items[this.chosenTupleName].push({
      name: this.itemName, 
      quantity: this.quantity+' '+this.unit
    });
    this.chosenTuple = _.cloneDeep(this.items[this.chosenTupleName]);
    this.itemName = "";
    this.quantity = "";
    this.unit = "";
  }

  deleteRow(data:ItemTuple){
    let index = this.items[this.chosenTupleName].findIndex(item => 
      item.name === data.name && item.quantity === data.quantity
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

}
