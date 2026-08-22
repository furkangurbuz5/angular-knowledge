import { Component, input } from '@angular/core';
import { IngredientWithQuantity } from '../../../../model/ingredient.model';
import { CollectionProperties } from '../../../../model/collection.model';

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
  readonly collectionProperties = input.required<CollectionProperties[]>();

}
