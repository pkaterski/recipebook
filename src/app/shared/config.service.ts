import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";
import 'rxjs/Rx';

import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "./ingredient.model";


@Injectable()
export class ConfigService {
constructor(private http: HttpClient, 
            private slService: ShoppingListService, 
            private recipeService: RecipeService,
            // private authService: AuthService
        ) {}

saveData() {
    this.saveRecipes();
    this.saveSL();
}

fetchData() {
    this.fetchRecipes();
    this.fetchSL();
}

saveRecipes() {
    // // Old way without interseptor
    // const token = this.authService.getToken();
    
    // this.http.put('https://udemy-recipe-project-db.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    // })
    //     .subscribe(
    //         (res) => console.log(res)
    //     );

    
    // This way allows reporting progress 
    const req = new HttpRequest('PUT', 'https://udemy-recipe-project-db.firebaseio.com/recipes.json', this.recipeService.getRecipes(), { reportProgress: true });

    this.http.request(req).subscribe();
}

saveSL() {
    this.http.put('https://udemy-recipe-project-db.firebaseio.com/shop.json', this.slService.getIngredients())
        .subscribe(
            // (res) => console.log(res)
        );
}

fetchRecipes() {
    let recipes = [];
    this.http.get<Recipe[]>('https://udemy-recipe-project-db.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
    })
        .map(
            // Add the ingredients propery when it's missing
            (fetchedData) => {
                for (let item of fetchedData) {
                    if (!item['ingredients'])
                        item['ingredients'] = [];
                }
                return fetchedData;
            }
        )
        .subscribe(
            (fetchedRecipes) => {
                // console.log(fetchedRecipes);
                this.recipeService.setRecipes(fetchedRecipes);
            }
        );
}

fetchSL() {
    let ingredients = [];
    this.http.get<Ingredient[]>('https://udemy-recipe-project-db.firebaseio.com/shop.json').subscribe(
        (fetchedIngredients) => {
            this.slService.setIngredients(fetchedIngredients);
        } 
    );
}
}