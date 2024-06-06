import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  private pokemonUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  private colorUrl: string = 'https://pokeapi.co/api/v2/pokemon-color';

  constructor( private http: HttpClient) {

  }

  getPokemon(id: string): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`${this.pokemonUrl}/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    );
  }

  getPokemonColor(color: string): Observable<any> {
    return this.http.get<any>(`${this.colorUrl}/${color}`).pipe(
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    );
  }
}
