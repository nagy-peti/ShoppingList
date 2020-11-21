import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms'
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { Recipe, RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  public addRecipeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddRecipeComponent>,
    public recipeService: RecipeService,
    @Inject(MAT_DIALOG_DATA) public data?: Recipe
    ) {
    this.addRecipeForm = this.formBuilder.group({
      name: [this.data?.name,Validators.required]})
   }

  ngOnInit(): void {
  }

  addRecipe(form: FormGroup) { 
  if (!this.data) { //add item
    this.recipeService.add(form.value);
  }
  else{ //modify item
    let modified:Recipe=this.data
    modified.name=form.value.name
    this.recipeService.add(modified)
    this.dialogRef.close();
  }
}

}
