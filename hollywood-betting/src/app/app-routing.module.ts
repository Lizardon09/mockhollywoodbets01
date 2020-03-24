import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SoccergamesComponent} from './soccergames/soccergames.component';
import {CountriesComponent} from './countries/countries.component';

const routes: Routes = [
  {path: 'dashboard',component: DashboardComponent},
  {path: 'soccergames', component: SoccergamesComponent},
  {path: 'countries/:id', component:CountriesComponent},
  {path:'',redirectTo:'/soccergames',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
