import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SocialComponent,
    RecipesComponent,
    ModifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'main', component: MainComponent, canActivate:[LoginGuard]},
      {path: 'social', component: SocialComponent, canActivate:[LoginGuard]},
      {path: 'recipes', component: RecipesComponent, canActivate:[LoginGuard]},
      {path: 'modify', component: ModifyComponent, canActivate:[LoginGuard]}
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
