import { Routes } from '@angular/router';
import { Detail } from './components/list/detail/detail';
import { List } from './components/list/list';
import { Dashboard } from './components/dashboard/dashboard';
import { Form } from './components/form/form';

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
];
