import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URLs } from '../constants';
import { Cocktail } from '../interfaces/cocktail';
import { CocktailService } from '../services/cocktail-service.service';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss']
})
export class CocktailDetailComponent implements OnInit {

  cocktail: Cocktail;

  cardImageURL: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public cocktailService: CocktailService
  ) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.fetchCocktailDetails(params.id);
      }
    });
  }

  ngOnInit(): void {
    this.cardImageURL = URLs.baseURL + URLs.cocktailImage;
  }

  fetchCocktailDetails(id: string) {
    this.cocktail = null;
    const url = URLs.baseURL + URLs.dataURL + URLs.lookupURL + '?i=' + id;
    this.cocktailService.getCocktails(url).subscribe(response => {
      this.cocktail = response[0];
    })
  }

  goToCocktailList() {
    this.router.navigate(['/cocktails']);
  }

}
