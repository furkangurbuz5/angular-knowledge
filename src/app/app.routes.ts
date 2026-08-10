import { Routes } from '@angular/router';
import { Detail } from './components/list/detail/detail';
import { List } from './components/list/list';
import { Dashboard } from './components/dashboard/dashboard';
import { Form } from './components/form/form';
import { RxjsDemo } from './components/rxjs-demo/rxjs-demo';
import { PropertyList } from './components/foods/property/property-list.component';
import { Ingredient } from './components/foods/ingredient/ingredient';
import { PropertyDetail } from './components/foods/property/property-detail/property-detail';

export const routes: Routes = [
  {
    path: 'person/:id',
    component: Detail,
    title: 'Person details',
  },
  {
    path: 'property/:id',
    component: PropertyDetail,
    title: 'Property details',
  },
  {
    path: 'persons',
    component: List,
    title: 'People',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: 'add',
    component: Form,
    title: 'Add a person',
  },
  {
    path: 'add-food',
    component: Ingredient,
    title: 'Add a food',
  },
  {
    path: 'properties',
    component: PropertyList,
    title: 'Add a property',
  },
  {
    path: 'rxjsdemo',
    component: RxjsDemo,
    title: 'RxJS Demo',
  },
];
