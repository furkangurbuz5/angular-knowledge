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
  },
  {
    path: 'persons',
    component: List,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'add',
    component: Form,
  },
  {
    path: 'rxjsdemo',
    component: RxjsDemo,
  }
];
