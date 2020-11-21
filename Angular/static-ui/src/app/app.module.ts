import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';


import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SocialComponent } from './social/social.component';
import { MainComponent } from './main/main.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ModifyComponent } from './modify/modify.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginGuard } from './login-guard/login.guard';

import {MatExpansionModule} from '@angular/material/expansion';
import { RecipeService } from './services/recipe.service';
import { ItemComponent } from './shared/item/item.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { AddItemComponent } from './shared/item/add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SocialComponent,
    RecipesComponent,
    ModifyComponent,
    ItemComponent,
    AddRecipeComponent,
    AddItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatBadgeModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'main', component: MainComponent, canActivate:[LoginGuard]},
      {path: 'social', component: SocialComponent, canActivate:[LoginGuard]},
      {path: 'recipes', component: RecipesComponent, canActivate:[LoginGuard]},
      {path: 'modify', component: ModifyComponent, canActivate:[LoginGuard]}
    ]),
    BrowserAnimationsModule,
    MatExpansionModule,
  ],
    providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
