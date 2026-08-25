import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { RxjsDemo } from './components/rxjs-demo/rxjs-demo';
import { PropertyList } from './components/foods/property/property-list.component';
import { PropertyDetail } from './components/foods/property/property-detail/property-detail';
import { FoodList } from './components/foods/food-list/food-list';
import { FoodDetail } from './components/foods/food-list/food-detail/food-detail';
import { DishDetail } from './components/collections/collection-detail/dish-detail';
import { DishList } from './components/collections/dish-list';
import { MealList } from './components/meals/meal-list';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: 'property/:id',
    component: PropertyDetail,
    title: 'Property details',
  },
  {
    path: 'food/:id',
    component: FoodDetail,
    title: 'Food details',
  },
  {
    path: 'dish/:id',
    component: DishDetail,
    title: 'Dish details',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: 'foods',
    component: FoodList,
    title: 'Add a food',
  },
  {
    path: 'properties',
    component: PropertyList,
    title: 'Add a property',
  },
  {
    path: 'dishes',
    component: DishList,
    title: 'Dishes',
  },
  {
    path: 'meals',
    component: MealList,
    title: 'Meals',
  },
  {
    path: 'meal/:id',
    component: MealList,
    title: 'Meal details',
  },
  {
    path: 'rxjsdemo',
    component: RxjsDemo,
    title: 'RxJS Demo',
  },
];
