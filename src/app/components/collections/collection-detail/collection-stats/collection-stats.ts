import { Component, input } from '@angular/core';
import { IngredientWithQuantity } from '../../../../model/ingredient.model';

interface CollectionTotals {
  protein: number;
  carbohydrate: number;
  fat: number;
  calories: number;
}

@Component({
  selector: 'app-collection-stats',
  imports: [],
  templateUrl: './collection-stats.html',
  styleUrl: './collection-stats.css',
})
export class CollectionStats {
  readonly collection = input.required<IngredientWithQuantity[]>();

}
