import { Routes } from '@angular/router';
import { PortafolioComponent } from './components/portafolio/portafolio.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PortafolioComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/portafolio/home/home.component').then((m) => m.default),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/portafolio/home/home.component').then((m) => m.default),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./components/portafolio/customers/customers.component').then((m) => m.default),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./components/portafolio/contact/contact.component').then((m) => m.default),
      },
      {
        path: 'proyects',
        loadComponent: () =>
          import('./components/portafolio/proyects/proyects.component').then((m) => m.default),
      },
      {
        path: 'skills',
        loadComponent: () =>
          import('./components/portafolio/skills/skills.component').then((m) => m.default),
      },
      {
        path: 'sobremi',
        loadComponent: () =>
          import('./components/portafolio/sobremi/sobremi.component').then((m) => m.default),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then((m) => m.default),
  },
  {
    path:'recovery',
    loadComponent:()=>import('./components/reset-password/reset-password.component').then(m=> m.ResetPasswordComponent)
  },

  {
  path: 'forgot-password',
  loadComponent: () =>
    import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
},
  {
    path: 'admin',
    children: [
      {
        path: 'formproyect',
        loadComponent: () =>
          import('./components/formularios/formproyect/formproyect.component'),
        canActivate: [authGuard],
      },
    ],
  },
];
