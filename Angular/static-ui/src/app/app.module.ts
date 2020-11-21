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

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
import { RegisterDialogComponent } from './login/register-dialog/register-dialog.component';

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
    RegisterDialogComponent,
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
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatRippleModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'main', component: MainComponent, canActivate: [LoginGuard] },
      { path: 'social', component: SocialComponent, canActivate: [LoginGuard] },
      { path: 'recipes', component: RecipesComponent, canActivate: [LoginGuard] }
    ]),
    BrowserAnimationsModule,
    MatExpansionModule,
  ],
    providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
