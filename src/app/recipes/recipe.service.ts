import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    private selectedRecipe: Recipe;


    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getSelectedRecipe() {
        return this.selectedRecipe;
    }

    select(id: number) {
        this.selectedRecipe = this.recipes[id];
    }

    find(id: number) {
        return this.recipes[id];
    }

    toShoppingList(recipe: Recipe) {
        // recipe.ingredients.forEach((ingredient) => this.slService.addItem(ingredient));
        this.slService.addIngredients(recipe.ingredients.slice());
    }

    toShoppingListById(id: number) {
        this.toShoppingList(this.recipes[id]);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes);
    }

    editRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes);
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes);
    }
}