import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokeHeaderComponent } from './components/poke-header/poke-header.component';
import { PokeSearchComponent } from './components/poke-search/poke-search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, PokeHeaderComponent, PokeSearchComponent],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
