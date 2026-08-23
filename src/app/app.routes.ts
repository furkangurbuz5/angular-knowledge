import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { RxjsDemo } from './components/rxjs-demo/rxjs-demo';
import { PropertyList } from './components/foods/property/property-list.component';
import { PropertyDetail } from './components/foods/property/property-detail/property-detail';
import { FoodList } from './components/foods/food-list/food-list';
import { FoodDetail } from './components/foods/food-list/food-detail/food-detail';
import { CollectionDetail } from './components/collections/collection-detail/collection-detail';
import { Collections } from './components/collections/collections';

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
    path: 'collection/:id',
    component: CollectionDetail,
    title: 'Collection details',
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
    path: 'collections',
    component: Collections,
    title: 'Collections',
  },
  {
    path: 'rxjsdemo',
    component: RxjsDemo,
    title: 'RxJS Demo',
  },
];
