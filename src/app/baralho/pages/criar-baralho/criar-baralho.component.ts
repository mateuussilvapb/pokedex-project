import { PokemonService } from './../../service/pokemon.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IgxDialogComponent,
  IgxGridComponent,
  IgxIconService,
  IgxSnackbarComponent,
} from 'igniteui-angular';
import { BehaviorSubject, finalize, take, tap } from 'rxjs';
import {
  Ability,
  Attack,
  PokemonData,
  Weakness,
} from 'src/app/shared/model/pokemon';

@Component({
  templateUrl: './criar-baralho.component.html',
  styleUrls: ['./criar-baralho.component.scss'],
})
export class CriarBaralhoComponent implements OnInit {
  @ViewChild(IgxSnackbarComponent, { static: true })
  public snackbar: IgxSnackbarComponent;

  @ViewChild('dialogAtaques', { read: IgxDialogComponent, static: true })
  public dialogAtaques: IgxDialogComponent;

  @ViewChild('dialogHabilidades', { read: IgxDialogComponent, static: true })
  public dialogHabilidades: IgxDialogComponent;

  @ViewChild('dialogFraquezas', { read: IgxDialogComponent, static: true })
  public dialogFraquezas: IgxDialogComponent;

  @ViewChild('dialogCard', { read: IgxDialogComponent, static: true })
  public dialogCard: IgxDialogComponent;

  @ViewChild('dialogTipos', { read: IgxDialogComponent, static: true })
  public dialogTipos: IgxDialogComponent;

  public form: FormGroup;
  public readonly pokemonFormArray = new FormArray(
    [],
    [Validators.required, Validators.maxLength(60), Validators.minLength(24)]
  );
  public pokemonCards: Set<PokemonData> = new Set<PokemonData>();
  public loading: boolean = false;
  public attacks: Array<Attack> = [];
  public abilities: Array<Ability> = [];
  public weaknesses: Array<Weakness> = [];
  public types: Array<string> = [];
  public srcImageModal: string = '';

  private currentPage: number = 1;

  constructor(
    private readonly router: Router,
    private cdRef: ChangeDetectorRef,
    private iconService: IgxIconService,
    private readonly formBuilder: FormBuilder,
    private readonly pokemonService: PokemonService
  ) {
    this.iconService.addSvgIcon('add', 'assets/icons/add.svg', 'filter-icons');
    this.iconService.addSvgIcon(
      'remove',
      'assets/icons/remove.svg',
      'filter-icons'
    );
  }

  ngOnInit(): void {
    this.initForm();
    this.consultarPokemons();
  }

  public showAttacks(event: any) {
    const pokemonSelected = this.findPokemonById(event.rowID);
    if (pokemonSelected && pokemonSelected.attacks) {
      this.attacks = pokemonSelected.attacks;
      this.dialogAtaques.open();
    }
  }

  public showAbilities(event: any) {
    const pokemonSelected = this.findPokemonById(event.rowID);
    if (pokemonSelected && pokemonSelected.abilities) {
      this.abilities = pokemonSelected.abilities;
      this.dialogHabilidades.open();
    }
  }

  public showWeaknesses(event: any) {
    const pokemonSelected = this.findPokemonById(event.rowID);
    if (pokemonSelected && pokemonSelected.weaknesses) {
      this.weaknesses = pokemonSelected.weaknesses;
      this.dialogFraquezas.open();
    }
  }

  public showCard(link: string) {
    this.srcImageModal = link;
    this.dialogCard.open();
  }

  public showTypes(event: any) {
    const pokemonSelected = this.findPokemonById(event.rowID);
    if (pokemonSelected && pokemonSelected.types) {
      this.types = pokemonSelected.types;
      this.dialogTipos.open();
    }
  }

  public addCard(card: PokemonData) {
    if (this.getQtdCartasBaralhoByName(card.name) === '4') {
      return;
    }
    this.pokemonFormArray.push(this.createPokemonGroup(card));
    this.pokemonFormArray.markAsDirty();
    this.pokemonFormArray.updateValueAndValidity();
  }

  public removeCard(card: PokemonData) {
    if (this.getQtdCartasBaralhoByName(card.name) === '0') {
      return;
    }
    const index = this.pokemonFormArray.controls.findIndex(
      (item) => item.get('name').value == card.name
    );
    if (index != undefined && index != null && typeof index == 'number') {
      this.pokemonFormArray.removeAt(index);
    }
  }

  private getQtdCartasBaralhoByName(name: string): string {
    let contador = 0;
    if (this.pokemonFormArray.length <= 0) {
      return contador.toString();
    }
    this.pokemonFormArray.controls.forEach((item) => {
      if (item.get('name') && item.get('name').value === name) {
        contador++;
      }
    });
    return contador.toString();
  }

  public getQtdCartasBaralhoById(id: string): string {
    let contador = 0;
    if (this.pokemonFormArray.length <= 0) {
      return contador.toString();
    }
    this.pokemonFormArray.controls.forEach((item) => {
      if (item.get('id') && item.get('id').value === id) {
        contador++;
      }
    });
    return contador.toString();
  }

  public gridScroll(action: any) {
    const scrollHeight = action.event.target.scrollHeight;
    const scrollTop = action.event.target.scrollTop;
    const clientHeight = action.event.target.clientHeight;
    if (
      !this.loading &&
      action.direction === 'vertical' &&
      scrollHeight - scrollTop <= clientHeight + 100
    ) {
      this.consultarPokemons();
    }
  }

  public onCloseDialogCard() {
    this.srcImageModal = '';
  }

  public get setToArray(): Array<PokemonData> {
    if (this.pokemonCards.size > 0) {
      const pokemonDataArray: Array<PokemonData> = [];
      this.pokemonCards.forEach((card) => {
        pokemonDataArray.push(card);
      });
      return pokemonDataArray;
    }
    return [];
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.snackbar.open('O formulário está inválido!');
      return;
    }
    this.form.get('id').setValue(this.generateRandomId);
    if (localStorage.getItem('list-baralhos')) {
      const arrayBaralhos = [
        ...JSON.parse(localStorage.getItem('list-baralhos')),
        this.form.value,
      ];
      localStorage.setItem('list-baralhos', JSON.stringify(arrayBaralhos));
      this.snackbar.open('Baralho criado com sucesso!');
      setTimeout(() => {
        this.router.navigate(['']);
      }, 2000);
      return;
    } else {
      const arrayBaralhos = [this.form.value];
      localStorage.setItem('list-baralhos', JSON.stringify(arrayBaralhos));
      this.snackbar.open('Baralho criado com sucesso!');
      setTimeout(() => {
        this.router.navigate(['']);
      }, 2000);
      return;
    }
  }

  private findPokemonById(id: string): PokemonData | undefined {
    let cardEncontrado = undefined;
    this.pokemonCards.forEach((card) => {
      if (card.id == id) {
        cardEncontrado = card;
      }
    });
    return cardEncontrado;
  }

  private createPokemonGroup(cardPokemon: PokemonData): FormGroup {
    const group: { [key: string]: any } = {};
    for (const key in cardPokemon) {
      if (cardPokemon.hasOwnProperty(key)) {
        group[key] = [cardPokemon[key]];
      }
    }
    return this.formBuilder.group(group);
  }

  private consultarPokemons() {
    this.loading = true;
    this.pokemonService
      .getAllPokemonsPaginate(this.currentPage)
      .pipe(
        tap(() => {
          this.loading = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.data) {
            response.data.forEach((card) => {
              this.pokemonCards.add(card);
            });
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
