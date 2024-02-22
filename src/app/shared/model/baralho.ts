import { PokemonData } from './pokemon';

export interface Baralho {
  cartas: Array<PokemonData>;
  id: string;
  nomeBaralho: string;
}
