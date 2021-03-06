import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { BetslipComponent } from './betslip/betslip.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule }    from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SoccergamesComponent } from './soccergames/soccergames.component';
import { CountriesComponent } from './countries/countries.component';
import { EventsComponent } from './events/events.component';
import { TabletemplateComponent } from './table-template/tabletemplate/tabletemplate.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/countries.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffects } from './store/effects/countries.effects';


@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    SideNavComponent,
    BetslipComponent,
    FooterComponent,
    DashboardComponent,
    SoccergamesComponent,
    CountriesComponent,
    EventsComponent,
    TabletemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      countries: reducer
    }),
    EffectsModule.forRoot([CountryEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
