import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { Item, ItemService } from '../services/item.service';
import { AddItemComponent } from '../shared/item/add-item/add-item.component';
import { Observable, Subscription } from 'rxjs';
import { SerialNumberService } from '../services/serialNumber.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
    public recipes!: Recipe[];
    private userId!: number;
    private subscription!: Subscription;

    constructor(
        private serialNumber: SerialNumberService,
        public dialog: MatDialog,
        public recipeService: RecipeService,
        public itemService: ItemService) {

    }



    ngOnInit(): void {
        this.getUserId();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    private getUserId() {
        this.subscription = this.serialNumber.serialNumberReceived.subscribe(
            data => {
                this.userId = data;
                this.getRecipes();
            }
        )
    }
    getRecipes() {
        this.recipeService.getAll().subscribe(
            (data) => {
                console.log(data)
                this.recipes = data
            }
        )
    }


    openAddRecipeDialog() {
        const dialogRef = this.dialog.open(AddRecipeComponent, {
            width: '300px',
            data: {
                userId: this.userId,
                recipe: null
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.getRecipes()
            console.log(this.recipes)
        }
        )
    }
    openModifyRecipeDialog(recipe: Recipe) {
        const dialogRef = this.dialog.open(AddRecipeComponent, {
            width: '300px',
            data: {
                userId: this.userId,
                recipe
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.getRecipes()
            console.log(this.recipes)
        }
        )
    }

    openAddItemDialog(recipe:Recipe) {
        const dialogRef = this.dialog.open(AddItemComponent, {
            width: '300px',
            data: {
                recipeId:recipe.id,
                item: null,
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.getRecipes()
            console.log(this.recipes)
        }
        )

    }
    deleteItem(deletedItem : Item){
        console.log(deletedItem)
        const index=this.recipes.findIndex(e=>e.id==deletedItem.recipe_id)
        this.recipes[index].items=this.recipes[index].items.filter(item=>item.id!=deletedItem.id)

    }
    deleteRecipe(id: number) {
        this.recipeService.delete(id).subscribe()
        this.recipes = this.recipes.filter(e => e.id != id)
    }


}
