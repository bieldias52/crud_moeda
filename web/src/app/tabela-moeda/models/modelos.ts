export interface ITabelaMoeda {
  id: string;
  nomeMoeda: string;
  idMoeda: string;
  quantidade: number;
  cotacaoMoeda: number;
  responsavel: string;
  observacao: string;
}

export interface IMoeda {
  id: string;
  nome: string;
  sigla: string;
}

// export function moedasRegistradas(): IMoeda[] {
//   return [
//     {
//       nome: 'Dólar',
//       sigla: 'USD',
//     },
//     {
//       nome: 'Dólar Canadense',
//       sigla: 'CAD',
//     },
//     {
//       nome: 'Euro',
//       sigla: 'EUR',
//     },
//     {
//       nome: 'Iene',
//       sigla: 'JPY',
//     },
//     {
//       nome: 'Libra Esterlina',
//       sigla: 'GBP',
//     },
//   ];
// }

export function rangerResponsaveis() {
  return ['Amarelo', 'Azul', 'Rosa', 'Verde', 'Vermelho'];
}
