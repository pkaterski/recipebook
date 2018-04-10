import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @Output() removeSelection = new EventEmitter<void>();
  @ViewChild('f') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditind.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem =  this.shoppingListService.getIngredient(index);

        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const value = this.shoppingListForm.value;
    if (this.editMode) {
      this.shoppingListService.editIngredient(this.editedItemIndex, new Ingredient(value.name, value.amount));
      this.editMode = false;
      this.shoppingListForm.reset();
      this.removeSelection.emit();
    } else {
      this.shoppingListService.addItem(new Ingredient(value.name, value.amount));
      this.shoppingListForm.reset();
    }
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteItem(this.editedItemIndex);
      this.editMode = false;
      this.removeSelection.emit();
      this.shoppingListForm.reset();
    }
  }

  onClearSelection() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.removeSelection.emit();
  }
}
