import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailDetailComponent } from './cocktail-detail/cocktail-detail.component';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';

const routes: Routes = [
  {
    path: '',
    component: CocktailListComponent
  },
  {
    path: 'cocktails',
    component: CocktailListComponent
  },
  {
    path: 'detail/:id',
    component: CocktailDetailComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocktailRoutingModule { }
