import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailModule } from './cocktail/cocktail.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/cocktails'
      },
      {
        path: 'cocktails',
        loadChildren: () => CocktailModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
