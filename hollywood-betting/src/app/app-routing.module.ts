import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SoccergamesComponent} from './soccergames/soccergames.component';
import {CountriesComponent} from './countries/countries.component';
import {EventsComponent} from './events/events.component';

const routes: Routes = [
  {path: 'dashboard',component: DashboardComponent},
  {path: 'soccergames', component: SoccergamesComponent},
  {path: ':id/:sportname', component: CountriesComponent},
  {path: 'countries/:id', component:CountriesComponent},
  {path: 'tournament/:tournamentid/:tournamentname', component:EventsComponent},
  {path: ':sportid/:sportname/tournament/:tournamentid/:tournamentname', component:EventsComponent},
  {path:'',redirectTo:'/soccergames',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
