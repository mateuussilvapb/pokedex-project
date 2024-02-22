import { Component, Input, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/shared/model/pokemon';

@Component({
  selector: 'app-info-card-pokemon',
  templateUrl: './info-card-pokemon.component.html',
  styleUrls: ['./info-card-pokemon.component.scss'],
})
export class InfoCardPokemonComponent implements OnInit {
  @Input() carta: PokemonData;

  ngOnInit(): void {}
}
