import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { CocktailDetailComponent } from './cocktail-detail/cocktail-detail.component';
import { CocktailRoutingModule } from './cocktail-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CocktailListComponent, CocktailDetailComponent],
  imports: [
    CommonModule,
    CocktailRoutingModule,
    FormsModule
  ]
})
export class CocktailModule { }
