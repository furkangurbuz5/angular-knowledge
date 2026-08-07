import { Routes } from '@angular/router';
import { Detail } from './components/list/detail/detail';
import { List } from './components/list/list';
import { Dashboard } from './components/dashboard/dashboard';
import { Form } from './components/form/form';
import { RxjsDemo } from './components/rxjs-demo/rxjs-demo';

export const routes: Routes = [
  {
    path: 'person/:id',
    component: Detail,
    title: 'Person details',
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
    path: 'rxjsdemo',
    component: RxjsDemo,
    title: 'RxJS Demo',
  },
];
