import { Component, OnInit } from '@angular/core';
import { IMoeda, ITabelaMoeda, rangerResponsaveis } from './models/modelos';
import { MatTableDataSource } from '@angular/material/table';
import { TabelaMoedaService } from './tabela-moeda.service';

@Component({
  selector: 'app-tabela-moeda',
  templateUrl: './tabela-moeda.component.html',
  styleUrls: ['./tabela-moeda.component.css'],
})
export class TabelaMoedaComponent implements OnInit {
  idMoeda!: string;
  quantidade!: number;
  cotacaoMoeda!: number;
  observacao!: string;
  responsavel!: string;
  indiceEdicao!: number;
  modoEdicao = false;

  listaMoedasRegistradas!: IMoeda[];

  listaRangers = rangerResponsaveis();

  dadosTabela: ITabelaMoeda[] = [];
  colunas = [
    'moeda',
    'quantidade',
    'cotacao',
    'valor',
    'responsavel',
    'observacao',
    'editar',
    'excluir',
  ];
  dataSource = new MatTableDataSource([]);

  constructor(private tabelaMoedaService: TabelaMoedaService) {}

  async ngOnInit(): Promise<void> {
    await this.montarDadosIniciais();
    await this.atualizarDataSource();
  }

  async montarDadosIniciais(): Promise<void> {
    this.listaMoedasRegistradas =
      await this.tabelaMoedaService.recuperarMoedas();
    this.idMoeda = this.listaMoedasRegistradas[0].id;
    this.responsavel = 'Vermelho';
  }

  async adicionarLancamento(): Promise<void> {
    const novoDado: ITabelaMoeda = {
      id: '',
      nomeMoeda: '',
      idMoeda: this.idMoeda,
      quantidade: this.quantidade,
      cotacaoMoeda: this.cotacaoMoeda,
      responsavel: this.responsavel,
      observacao: this.observacao,
    };
    await this.tabelaMoedaService.criarNovoLancamento(novoDado);
    this.atualizarDataSource();
    this.limparCampos();
  }

  habilitarEdicao(item: ITabelaMoeda, indice: number): void {
    this.modoEdicao = true;

    this.idMoeda = item.idMoeda;
    this.quantidade = item.quantidade;
    this.cotacaoMoeda = item.cotacaoMoeda;
    this.responsavel = item.responsavel;
    this.observacao = item.observacao;
    this.indiceEdicao = indice;
  }

  async editarLancamento(): Promise<void> {
    const dadoEditado: ITabelaMoeda = {
      id: this.dadosTabela[this.indiceEdicao].id,
      nomeMoeda: '',
      idMoeda: this.idMoeda,
      quantidade: this.quantidade,
      cotacaoMoeda: this.cotacaoMoeda,
      responsavel: this.responsavel,
      observacao: this.observacao,
    };
    await this.tabelaMoedaService.atualizarDadosLancamento(dadoEditado);
    await this.atualizarDataSource();
    this.limparCampos();
  }

  async excluirLancamento(id: string): Promise<void> {
    await this.tabelaMoedaService.excluirLancamento(id);
    await this.atualizarDataSource();
  }

  async atualizarDataSource(): Promise<void> {
    this.dadosTabela = await this.tabelaMoedaService.carregarDadosTabela();
    console.log(this.dadosTabela);
    this.dataSource = new MatTableDataSource(this.dadosTabela);
  }

  limparCampos(): void {
    this.modoEdicao = false;
    this.quantidade = null;
    this.cotacaoMoeda = null;
    this.observacao = null;
  }

  recuperarCor(ranger: string): string {
    switch (ranger) {
      case 'Amarelo':
        return 'color: gold';
      case 'Azul':
        return 'color: blue';
      case 'Rosa':
        return 'color: deeppink';
      case 'Verde':
        return 'color: limegreen';
      case 'Vermelho':
        return 'color: crimson';
      default:
        return 'color: black';
    }
  }
}
