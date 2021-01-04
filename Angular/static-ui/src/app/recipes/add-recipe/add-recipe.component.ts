import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Recipe, RecipeService } from 'src/app/services/recipe.service';

@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

    public addRecipeForm: FormGroup;
    private userId!: number;
    isNameEmpty!: boolean;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AddRecipeComponent>,
        public recipeService: RecipeService,
        @Inject(MAT_DIALOG_DATA) public data: { userId: number, recipe?: Recipe }
    ) {
        this.addRecipeForm = this.formBuilder.group({
            name: [this.data.recipe?.name, Validators.required]
        })
    }

    ngOnInit(): void {
    }


    addRecipe(form: FormGroup) {
        if (!this.data.recipe) { //add item

            this.recipeService.add(form.value).subscribe()
        }
        else { //modify item
            let modified: Recipe = this.data.recipe
            modified.name = form.value.name
            this.recipeService.modify(modified).subscribe()
        }
        this.dialogRef.close();
    }

    getErrorMessage(): string {
        this.isNameEmpty = this.addRecipeForm.value.name == null || this.addRecipeForm.value.name.length == 0
        if (this.isNameEmpty) {
            return 'You must enter a value';
        }
        return 'error'
    }

}