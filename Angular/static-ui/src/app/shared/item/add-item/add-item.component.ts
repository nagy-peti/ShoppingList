import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Item, ItemService } from 'src/app/services/item.service';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
 
  
  public addItemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddItemComponent>,
    public ItemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data?: Item
  ) {
    this.addItemForm = this.formBuilder.group({
      name: [this.data?.name,Validators.required],
      quantity: [this.data?.quantity,Validators.required],
      quantity_type: [this.data?.quantity_type,Validators.required],
    })
   }

  ngOnInit(): void {
    console.log(this.data)
  }

  addItem(form: FormGroup) {
    if (!this.data) { //add item
    this.ItemService.add(form.value);
  }
  else{ //modify item
    let modified:Item=this.data
    modified.name=form.value.name
    modified.quantity=form.value.quantity
    modified.quantity_type=form.value.quantity_type
    this.ItemService.modify(modified);
  }
  this.dialogRef.close();
  }
}
