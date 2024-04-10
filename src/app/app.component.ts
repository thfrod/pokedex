import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgBusyModule } from 'ng-busy';
import { Pokemon } from 'pokenode-ts';
import { Subscription } from 'rxjs';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgBusyModule,
    PokemonCardComponent,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  protected busy$: Subscription[] = [];
  protected pokemonList: Pokemon[] = [];
  protected pokemonListFiltered: Pokemon[] = [];
  protected pokemonSearch: string;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    for (let i = 1; i <= 150; i++) {
      this.getPokemon(i);
    }
    this.pokemonListFiltered = this.pokemonList;
  }

  private getPokemon(id: number) {
    this.busy$.push(
      this.apiService.getPokemon(id).subscribe((pokemon: Pokemon) => {
        this.pokemonList.push(pokemon);
      })
    );
  }

  protected filterList() {
    if (!this.pokemonSearch && this.pokemonSearch.length == 0) {
      this.pokemonListFiltered = this.pokemonList;
      return;
    }

    this.pokemonListFiltered = this.pokemonList.filter((pokemon: Pokemon) => {
      return pokemon.name
        .toLowerCase()
        .includes(this.pokemonSearch.toLowerCase());
    });
  }
}
