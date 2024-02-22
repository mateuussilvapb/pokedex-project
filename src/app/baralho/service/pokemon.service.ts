import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePokemonCards } from '../../shared/model/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apiUrl: string = 'https://api.pokemontcg.io/v2';

  private readonly apiKey: string = environment.apiKey;

  constructor(protected readonly http: HttpClient) {}

  public getAllPokemonsPaginate(
    page: number
  ): Observable<ResponsePokemonCards> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);
    let params = new HttpParams()
      .set('pageSize', '12')
      .set('page', page.toString());
    return this.http.get<ResponsePokemonCards>(`${this.apiUrl}/cards`, {
      headers,
      params,
    });
  }

  public getAllPokemons(): Observable<ResponsePokemonCards> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);
    return this.http.get<ResponsePokemonCards>(`${this.apiUrl}/cards`, {
      headers,
    });
  }
}
