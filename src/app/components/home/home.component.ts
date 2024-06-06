import { PokemonApiService } from './../../service/pokemon-api.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { NgFor } from '@angular/common';
import { Pokemon } from '../../service/pokemon';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavbarComponent, NgFor]
})
export class HomeComponent implements OnInit {

  constructor(private servicePokemon: PokemonApiService){}

  ngOnInit(): void {
    this.getData(151)
  }

  pokemonsShow: Pokemon[] = [];
  pokemonsAll: (Pokemon & { color?: string })[] = [];

  handleButtonClick(id: string): void {
    console.log(`Button with id ${id} was clicked`);
    if (id === "ver-todos") {
      this.pokemonsShow = [...this.pokemonsAll];
    } else {
      this.filterByColor(id);
    }
  }

  getData(cantidad: number) {
    for (let i = 1; i <= cantidad; i++) {
      this.servicePokemon.getPokemon(i.toString()).subscribe({
        next: (poke: any | undefined) => {
          if (poke) {
            this.servicePokemon.getPokemonColor(i.toString()).subscribe({
              next: (colorData: any | undefined) => {
                if (colorData) {
                  poke.color = colorData.name;
                }
                this.pokemonsAll.push(poke);
                this.pokemonsShow.push(poke);
              },
              error: (err) => {
                console.log(err);
                this.pokemonsAll.push(poke);
                this.pokemonsShow.push(poke);
              }
            });
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  filterByColor(color: string): void {
    this.servicePokemon.getPokemonColor(color).subscribe({
      next: (data: any) => {
        const colorPokemonNames = data.pokemon_species.map((species: any) => species.name);
        this.pokemonsShow = this.pokemonsAll.filter(pokemon => colorPokemonNames.includes(pokemon.name));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
