import { UUID } from "crypto";

export interface Currency {
  id: UUID;
  nome: string;
  sigla: string;
}
