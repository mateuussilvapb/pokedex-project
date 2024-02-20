import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { PokeHeaderComponent } from './components/poke-header/poke-header.component';
import { PokeSearchComponent } from './components/poke-search/poke-search.component';
import { LoadingComponentComponent } from './components/loading-component/loading-component.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokeHeaderComponent,
    PokeSearchComponent,
    LoadingComponentComponent,
    PokeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
