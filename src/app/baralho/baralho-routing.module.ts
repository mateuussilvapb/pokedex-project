import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaralhosPokemonComponent } from './pages/baralhos-pokemon/baralhos-pokemon.component';
import { CriarBaralhoComponent } from './pages/criar-baralho/criar-baralho.component';
import { VisualizarBaralhoComponent } from './pages/visualizar-baralho/visualizar-baralho.component';

const routes: Routes = [
  {
    path: '',
    component: BaralhosPokemonComponent,
  },
  {
    path: 'criar-baralho',
    component: CriarBaralhoComponent,
  },
  {
    path: 'visualizar-baralho/:id',
    component: VisualizarBaralhoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaralhoRoutingModule {}
