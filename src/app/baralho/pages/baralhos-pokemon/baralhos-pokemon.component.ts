import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/shared/model/pokemon';

@Component({
  selector: 'app-baralhos-pokemon',
  templateUrl: './baralhos-pokemon.component.html',
  styleUrls: ['./baralhos-pokemon.component.scss'],
})
export class BaralhosPokemonComponent implements OnInit {
  public baralhos: Array<PokemonData> = [];

  ngOnInit(): void {}
}