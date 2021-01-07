import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Cocktail } from '../interfaces/cocktail';
import { URLs } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  constructor(
    private http: HttpClient
    ) { }

  public getCocktails(url: string): Observable<any> {
    return this.http.get(url).pipe(map((response: any) => {
      response = response.drinks;
      response = this.formatIngredients(response);
      return response;
    }));
  }

  public getOptions(type: string) {
    const url = URLs.baseURL + URLs.dataURL + URLs.listURL + '?' + type + '=list';
    return this.getCocktails(url);
  }

  public formatIngredients(response, maxIngredients = 15): string[] {
    if (response && response.length) {
      response = response.map((cocktail: Cocktail) => {
        const ingredients: string[] = [];
        for (let i = 1; i <= maxIngredients; i++) {
          if (cocktail['strIngredient' + i]) {
            let ingredient = ' ' + cocktail['strIngredient' + i];
            if (cocktail['strMeasure' + i]) {
              ingredient += '(' + cocktail['strMeasure' + i] + ')';
            }
            ingredients.push(ingredient);
          }
        }
        cocktail.ingredients = ingredients;
        return cocktail;
      });
    }
    return response;
  }
}
