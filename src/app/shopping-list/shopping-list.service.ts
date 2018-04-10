import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";

export class ShoppingListService {
    startedEditind = new Subject<number>();
    private ingredients: Ingredient[] = [];
    ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    setIngredients(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
        this.ingredientsChanged.next( this.ingredients.slice());
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    editIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addItem(ingredient: Ingredient): void {
        // checks if the ingredient is already in the list
        let match = false;
        this.ingredients.forEach((item, index) => {
            if (item.name.toUpperCase() === ingredient.name.toUpperCase()) {
                this.ingredients[index].amount += ingredient.amount;
                this.ingredientsChanged.next(this.ingredients.slice());
                match = true;
            }
        });
        
        if (!match) {
            // pushing a referance to the original ingredient is BAD!
            // this.ingredients.push(ingredient);
            //so instead clone ingredinet ES6
            const clonedIngredient = {...ingredient};
            this.ingredients.push(clonedIngredient);
            this.ingredientsChanged.next(this.ingredients.slice());
        }
    }

    deleteItem(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // this.ingredients.push(...ingredients);
        for (let i of ingredients) {
            this.addItem(i);
        }
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}