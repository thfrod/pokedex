import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pokemon } from 'pokenode-ts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = 'https://pokeapi.co/api/v2/pokemon/';

  // constructor(private readonly http: HttpClient) {}
  private http = inject(HttpClient);

  public getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.api + id);
  }
}
