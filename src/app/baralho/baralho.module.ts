import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaralhoRoutingModule } from './baralho-routing.module';
import { CriarBaralhoComponent } from './pages/criar-baralho/criar-baralho.component';
import { BaralhosPokemonComponent } from './pages/baralhos-pokemon/baralhos-pokemon.component';
import {
  IgxGridModule,
  IgxDialogModule,
  IgxFocusModule,
  IgxButtonModule,
  IgxCardModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxRippleModule,
  IgxAvatarModule,
  IgxBadgeModule,
  IgxSnackbarModule,
  IgxSwitchModule,
  IgxButtonGroupModule,
  IgxToastModule,
  IgxTooltipModule,
} from 'igniteui-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { VisualizarBaralhoComponent } from './pages/visualizar-baralho/visualizar-baralho.component';
import { InfoCardPokemonComponent } from './components/info-card-pokemon/info-card-pokemon.component';

@NgModule({
  declarations: [
    CriarBaralhoComponent,
    BaralhosPokemonComponent,
    VisualizarBaralhoComponent,
    InfoCardPokemonComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BaralhoRoutingModule,
    IgxCardModule,
    IgxIconModule,
    IgxRippleModule,
    IgxButtonModule,
    IgxInputGroupModule,
    SharedModule,
    IgxGridModule,
    IgxDialogModule,
    IgxFocusModule,
    IgxAvatarModule,
    IgxBadgeModule,
    IgxSnackbarModule,
    IgxSwitchModule,
    IgxButtonGroupModule,
    IgxToastModule,
    IgxTooltipModule,
  ],
})
export class BaralhoModule {}
