import { PokemonService } from './../../service/pokemon.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  GridSelectionMode,
  IRowSelectionEventArgs,
  IgxSnackbarComponent,
} from 'igniteui-angular';
import { finalize, take } from 'rxjs';
import {
  Ability,
  Attack,
  PokemonData,
  Weakness,
} from 'src/app/shared/model/pokemon';

@Component({
  selector: 'app-criar-baralho',
  templateUrl: './criar-baralho.component.html',
  styleUrls: ['./criar-baralho.component.scss'],
})
export class CriarBaralhoComponent implements OnInit {
  @ViewChild(IgxSnackbarComponent, { static: true })
  public snackbar: IgxSnackbarComponent;
  public form: FormGroup;
  public readonly pokemonFormArray = new FormArray(
    [],
    [Validators.required, Validators.maxLength(60), Validators.minLength(24)]
  );
  public pokemonCards: Array<PokemonData> = [];
  public loading: boolean = false;
  public selectionMode: GridSelectionMode = 'multiple';
  public selectedRows = [];
  public hideRowSelectors = false;
  public showModalAttacks = false;
  public showModalAbilities = false;
  public showModalWeaknesses = false;
  public attacks: Array<Attack> = [];
  public abilities: Array<Ability> = [];
  public weaknesses: Array<Weakness> = [];

  private currentPage: number = 1;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.consultarPokemons();
  }

  public showAttacks(event: any) {
    const pokemonSelected = this.findPokemonById(event.rowID);
    if (pokemonSelected && pokemonSelected.attacks) {
      this.attacks = pokemonSelected.attacks;
      this.showModalAttacks = true;
    }
  }

  public showAbilities(event: any) {
    const pokemonSelected = this.findPokemonById(event.rowID);
    if (pokemonSelected && pokemonSelected.abilities) {
      this.abilities = pokemonSelected.abilities;
      this.showModalAbilities = true;
    }
  }

  public showWeaknesses(event: any) {
    const pokemonSelected = this.findPokemonById(event.rowID);
    if (pokemonSelected && pokemonSelected.weaknesses) {
      this.weaknesses = pokemonSelected.weaknesses;
      this.showModalWeaknesses = true;
    }
  }

  public onSubmit() {
    this.form.get('id').setValue(this.generateRandomId);
    localStorage.setItem('list-baralhos', JSON.stringify(this.form.value));
    this.snackbar.open('Baralho criado com sucesso!');
    setTimeout(() => {
      this.router.navigate(['']);
    }, 5000);
  }

  private findPokemonById(id: string): PokemonData | undefined {
    return this.pokemonCards.find((card) => card.id == id);
  }

  public handleRowSelection(event: IRowSelectionEventArgs) {
    this.pokemonFormArray.clear();
    event.newSelection.forEach((item) => {
      this.pokemonFormArray.push(this.createPokemonGroup(item));
    });
    this.pokemonFormArray.markAsDirty();
    this.pokemonFormArray.updateValueAndValidity();
  }

  private createPokemonGroup(cardPokemon: PokemonData): FormGroup {
    return this.formBuilder.group({
      cardPokemon,
    });
  }

  private consultarPokemons() {
    this.loading = true;
    this.pokemonService
      .getAllPokemons()
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (response) => {
          this.loading = false;
          if (this.pokemonCards.length === 0) {
            this.pokemonCards = response.data;
          } else {
            this.pokemonCards = [...this.pokemonCards, ...response.data];
          }
          this.currentPage++;
        },
        error: (error) => {
          console.log(error);
          this.snackbar.open('Erro ao consultar Pokemóns');
        },
      });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      nomeBaralho: [null, [Validators.required]],
      cartas: this.pokemonFormArray,
    });
  }

  private get generateRandomId(): string {
    const timestamp = new Date().getTime().toString(16);
    const random = (Math.random() * 1000000).toString(16);
    return timestamp + random;
  }
}
