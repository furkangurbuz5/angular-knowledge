import { Routes } from '@angular/router';
import { PersonDetail } from './components/person-list/person-detail/person-detail';
import { PersonList } from './components/person-list/person-list';
import { Dashboard } from './components/dashboard/dashboard';
import { AddPerson } from './components/form/add-person.component';
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
    path: 'person/:id',
    component: PersonDetail,
    title: 'Person details',
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
    path: 'persons',
    component: PersonList,
    title: 'People',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: 'add-person',
    component: AddPerson,
    title: 'Add a person',
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
