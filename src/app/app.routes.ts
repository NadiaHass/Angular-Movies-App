import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', // Only needed for empty paths
  },
  {
    path: 'home',
    // lazy loading that educes initial bundle size and improves performance
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'test',
    loadComponent: () => import('./pages/test/test.component').then(m => m.TestComponent),
  },
  {
    path: 'tvshow/:serie_id',
    loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent),
  },
  {
    path: 'movie/:movie_id',
    loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent),
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/view-category/view-category.component').then(m => m.ViewCategoryComponent),
  },
  {
    path: 'tvshows',
    loadComponent: () => import('./pages/view-category/view-category.component').then(m => m.ViewCategoryComponent),
  }
];
