import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @HostBinding('class') get pokemonTypeClass() {
    return this.pokemon.types[0].type.name ?? 'normal';
  }

  protected typeList: string[] = [];

  ngOnInit(): void {
    this.typeList = this.pokemon.types.map((item) => item.type.name);
  }
}
