import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Item, ItemService } from 'src/app/services/item.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: { recipeId?:number, item?: Item }
  ) {
    this.addItemForm = this.formBuilder.group({
      name: [this.data.item?.name, Validators.required],
      quantity: [this.data.item?.quantity, Validators.required],
      quantity_type: [this.data.item?.quantity_type, Validators.required],
    })
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  addItem(form: FormGroup) {
    if (!this.data.item) { //add item
      form.value["recipe_id"] = this.data.recipeId;
      console.log(form.value)
      this.ItemService.add(form.value).subscribe();
    }
    else { //modify item
      let modified: Item = this.data.item
      modified.name = form.value.name
      modified.quantity = form.value.quantity
      modified.quantity_type = form.value.quantity_type
      console.log(modified)
      this.ItemService.modify(modified).subscribe();
    }
    this.dialogRef.close();
  }
}
