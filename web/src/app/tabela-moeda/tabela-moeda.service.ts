import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IMoeda, ITabelaMoeda } from './models/modelos';

@Injectable({
  providedIn: 'root',
})
export class TabelaMoedaService {
  constructor(private http: HttpClient) {}

  async recuperarMoedas(): Promise<IMoeda[]> {
    return await lastValueFrom(
      this.http.get<IMoeda[]>('http://127.0.0.1:3333/currencies')
    );
  }

  async carregarDadosTabela(): Promise<ITabelaMoeda[]> {
    return await lastValueFrom(
      this.http.get<ITabelaMoeda[]>('http://127.0.0.1:3333/transaction')
    );
  }

  async criarNovoLancamento(entrada: ITabelaMoeda): Promise<void> {
    return await lastValueFrom(
      this.http.post<void>('http://127.0.0.1:3333/transaction', entrada)
    );
  }

  async atualizarDadosLancamento(entrada: ITabelaMoeda): Promise<void> {
    return await lastValueFrom(
      this.http.put<void>(
        'http://127.0.0.1:3333/transaction/' + entrada.id,
        entrada
      )
    );
  }

  async excluirLancamento(entrada: string): Promise<void> {
    return await lastValueFrom(
      this.http.delete<void>('http://127.0.0.1:3333/transaction/' + entrada)
    );
  }
}
