import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../services/recipe.service';
import {MatDialog} from '@angular/material/dialog';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ItemService } from '../services/item.service';
import { AddItemComponent } from '../shared/item/add-item/add-item.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  public recipes: Recipe[] = [];

  constructor(public dialog: MatDialog,
    public recipeService: RecipeService,
    public itemService: ItemService) { 
    
  }
  ngOnInit():void{
    this.recipeService.getAll().subscribe((data: Recipe[])=>{
    this.recipes=data
  });
  console.log(this.recipes)

  }

  openAddRecipeDialog() {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width:'300px'
    });
  }
  openModifyRecipeDialog(recipe:Recipe) {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width:'300px',
      data:recipe
    });
  }
  openAddItemDialog() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width:'300px'
    });
  }
  deleteRecipe(id:number) {
    this.recipeService.delete(id)
  }
  

}
