import { UUID } from "crypto";

export interface BankTransaction {
  id: UUID;
  idMoeda: string;
  quantidade: number;
  cotacaoMoeda: number;
  responsavel: string;
  observacao: string;
}
