import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../services/recipe.service';
import {MatDialog} from '@angular/material/dialog';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ItemService } from '../services/item.service';
import { AddItemComponent } from '../shared/item/add-item/add-item.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  public recipes;

  constructor(public dialog: MatDialog,
    public recipeService: RecipeService,
    public itemService: ItemService) { 
    this.recipes=recipeService.getAll();
  }

  ngOnInit(): void {
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
