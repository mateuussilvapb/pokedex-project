import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaralhosPokemonComponent } from './pages/baralhos-pokemon/baralhos-pokemon.component';
import { CriarBaralhoComponent } from './pages/criar-baralho/criar-baralho.component';

const routes: Routes = [
  {
    path: '',
    component: BaralhosPokemonComponent,
  },
  {
    path: 'criar-baralho',
    component: CriarBaralhoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaralhoRoutingModule {}
