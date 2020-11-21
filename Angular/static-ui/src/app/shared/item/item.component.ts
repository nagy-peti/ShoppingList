import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item, ItemService } from 'src/app/services/item.service';
import { AddItemComponent } from './add-item/add-item.component';

@Component({
  selector: 'item-card',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() public item: any; // !!!!!!!!!!!!!!!!!!!
  constructor(public dialog: MatDialog,
    public itemService: ItemService) { }

  ngOnInit(): void {
  }
  delete(id: number) {
    this.itemService.delete(id)
  }

  openAddItemDialog() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '300px',
    });
  }
  openAddModifyDialog(item: Item) {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '300px',
      data: item
    });
  }

  }
