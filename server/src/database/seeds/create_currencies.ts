import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("currencies").insert([
    { nomeMoeda: "Dolar", sigla: "USD" },
    { nomeMoeda: "Euro", sigla: "EUR" },
    { nomeMoeda: "Iene", sigla: "JPY" },
    { nomeMoeda: "Dolar Canadense", sigla: "CAD" },
    { nomeMoeda: "Libra", sigla: "GBP" },
  ]);
}
