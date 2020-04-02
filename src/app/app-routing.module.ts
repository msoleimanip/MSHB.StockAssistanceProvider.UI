import { DashboardModule } from './lazy-load/dashboard/dashboard.module';
import { PresidentType } from './dataModels/enums/presidentType';
import { AuthGuard } from './_gaurds/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersModule } from './lazy-load/users/users.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => DashboardModule
  },
  {
    path: 'users',
    loadChildren: () => UsersModule,
    canActivate: [AuthGuard],
    data: { roles: [PresidentType.Admin] }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
