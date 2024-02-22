import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IgxIconService, IgxSnackbarComponent } from 'igniteui-angular';
import { Baralho } from 'src/app/shared/model/baralho';

@Component({
  templateUrl: './baralhos-pokemon.component.html',
  styleUrls: ['./baralhos-pokemon.component.scss'],
})
export class BaralhosPokemonComponent implements OnInit {
  @ViewChild(IgxSnackbarComponent, { static: true })
  public snackbar: IgxSnackbarComponent;
  public loading: boolean = false;
  public baralhos: Array<Baralho> = [];
  public showModalDelecao: boolean = false;
  public idParaDelecao: string = '';

  constructor(
    private readonly router: Router,
    private readonly iconService: IgxIconService
  ) {
    this.iconService.addSvgIcon('see', 'assets/icons/see.svg', 'filter-icons');
    this.iconService.addSvgIcon(
      'delete',
      'assets/icons/delete.svg',
      'filter-icons'
    );
    this.iconService.addSvgIcon(
      'edit',
      'assets/icons/edit.svg',
      'filter-icons'
    );
  }

  ngOnInit(): void {
    this.consultarBaralhos();
  }

  public confirmarExclusao(id: string) {
    this.idParaDelecao = id;
    this.showModalDelecao = true;
  }

  public deletarBaralho() {
    this.baralhos = this.baralhos.filter(
      (item) => item.id !== this.idParaDelecao
    );
    localStorage.setItem('list-baralhos', JSON.stringify(this.baralhos));
    this.showModalDelecao = false;
    this.snackbar.open('Baralho removido com sucesso!');
    this.consultarBaralhos();
  }

  public visualizarBaralho(id: string) {
    this.router.navigate([`visualizar-baralho/${id}`]);
  }

  private consultarBaralhos() {
    this.loading = true;
    const baralhosLocalStorage = JSON.parse(
      localStorage.getItem('list-baralhos')
    );
    if (baralhosLocalStorage) {
      this.baralhos = baralhosLocalStorage;
    }
    this.loading = false;
  }
}
