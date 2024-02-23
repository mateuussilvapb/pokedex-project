import { Baralho } from './../../../shared/model/baralho';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './visualizar-baralho.component.html',
  styleUrls: ['./visualizar-baralho.component.scss'],
})
export class VisualizarBaralhoComponent implements OnInit {
  public baralho: Baralho;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.acessarBaralho();
  }

  public get qtdCartasPokemons(): number {
    if (this.baralho) {
      const pokemons = this.baralho.cartas.filter(
        (carta) => carta['cardPokemon'].supertype === 'Pokémon'
      );
      return pokemons.length;
    }
    return 0;
  }

  public get qtdCartasTreinadores(): number {
    if (this.baralho) {
      const pokemons = this.baralho.cartas.filter(
        (carta) => carta['cardPokemon'].supertype === 'Trainer'
      );
      return pokemons.length;
    }
    return 0;
  }

  public get tiposUnicos(): Set<string> {
    const tipos = new Set<string>();
    this.baralho.cartas.forEach((carta) => {
      if (carta['cardPokemon'].types) {
        carta['cardPokemon'].types.forEach((tipo) => {
          tipos.add(tipo);
        });
      }
    });
    return tipos;
  }

  private acessarBaralho() {
    const idBaralho = this.route.snapshot.params['id'];
    if (idBaralho != null && idBaralho != undefined) {
      const baralhos: Array<Baralho> = JSON.parse(
        localStorage.getItem('list-baralhos')
      ) as Array<Baralho>;
      if (baralhos) {
        this.baralho = baralhos.find((item) => item.id == idBaralho);
      }
    }
  }
}
