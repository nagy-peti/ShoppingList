import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SocialComponent } from './social/social.component';
import { MainComponent } from './main/main.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ModifyComponent } from './modify/modify.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SocialComponent,
    RecipesComponent,
    ModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'main', component: MainComponent},
      {path: 'social', component: SocialComponent},
      {path: 'recipes', component: RecipesComponent},
      {path: 'modify', component: ModifyComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
