import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { URLs } from '../constants';
import { CocktailService } from '../services/cocktail-service.service';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {

  cocktailList$: Observable<any>;

  searchedText: string = '';
  
  searchedTextUpdate = new Subject<string>();

  searchedCharacter: string;

  categoryList$: Observable<any>;

  selectedCategory: string;

  alcoholicList$: Observable<any>;

  selectedAlcoholic: string;

  glassList$: Observable<any>;

  selectedGlass: string;

  ingredientList$: Observable<any>;

  selectedIngredient: string;

  cardImageURL: string;

  constructor(
    public cocktailService: CocktailService
  ) {
    this.getDataForFilters();
  }

  ngOnInit(): void {
    this.searchedTextUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(searchedValue => {
        this.searchByName(searchedValue);
      });
    this.cardImageURL = URLs.baseURL + URLs.cocktailImage;
    this.searchByName(this.searchedText);
  }

  public fetchCocktails(url: string) {
    this.cocktailList$ = this.cocktailService.getCocktails(url);
  }

  getDataForFilters() {
    this.categoryList$ = this.cocktailService.getOptions('c');
    this.alcoholicList$ = this.cocktailService.getOptions('a');
    this.glassList$ = this.cocktailService.getOptions('g');
    this.ingredientList$ = this.cocktailService.getOptions('i');
  }

  generateRandomDrink() {
    this.clearFilter();
    const url = URLs.baseURL + URLs.dataURL + URLs.randomURL;
    this.fetchCocktails(url);
  }

  searchByName(searchedValue) {
      this.clearFilter(false);
      const url = URLs.baseURL + URLs.dataURL + URLs.searchURL + '?s=' + searchedValue;
      this.fetchCocktails(url);
  }

  searchByFirstCharacter(firstCharacter: string) {
    if (firstCharacter) {
      this.clearFilter(true, false);
      const url = URLs.baseURL + URLs.dataURL + URLs.searchURL + '?f=' + firstCharacter;
      this.fetchCocktails(url);
    } else {
      this.searchByName('');
    }
  }

  filterByCategory(event: string) {
    this.clearFilter(true, true, false);
    const url = URLs.baseURL + URLs.dataURL + URLs.filterURL + '?c=' + event;
    this.fetchCocktails(url);
  }

  filterByAlcoholic(event: string) {
    this.clearFilter(true, true, true, false);
    const url = URLs.baseURL + URLs.dataURL + URLs.filterURL + '?a=' + event;
    this.fetchCocktails(url);
  }

  filterByGlass(event: string) {
    this.clearFilter(true, true, true, true, false);
    const url = URLs.baseURL + URLs.dataURL + URLs.filterURL + '?g=' + event;
    this.fetchCocktails(url);
  }

  filterByIngredient(event: string) {
    this.clearFilter(true, true, true, true, true, false);
    const url = URLs.baseURL + URLs.dataURL + URLs.filterURL + '?i=' + event;
    this.fetchCocktails(url);
  }

  clearFilter(search = true, firstCharacter = true, category = true, alcoholic = true, glass = true, ingredients = true) {
    if (search) {
      this.searchedText = '';
    }
    if (firstCharacter) {
      this.searchedCharacter = '';
    }
    if (category) {
      this.selectedCategory = '';
    }
    if (alcoholic) {
      this.selectedAlcoholic = '';
    }
    if (glass) {
      this.selectedGlass = '';
    }
    if (ingredients) {
      this.selectedIngredient = '';
    }
  }
}
