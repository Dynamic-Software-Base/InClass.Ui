import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DashboardPageComponent } from './features/dashboard/dashboard.page';
import { LoginPageComponent } from './features/auth/login.page';
import { MembersPageComponent } from './features/members/members.page';
import { InvitationPageComponent } from './features/invitation/invitation.page';
import { AppShellLayoutComponent } from './features/layout/app-shell-layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/dashboard'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'invitation/:token',
    component: InvitationPageComponent
  },
  {
    path: 'app',
    component: AppShellLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: 'members',
        component: MembersPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'app/dashboard'
  }
];