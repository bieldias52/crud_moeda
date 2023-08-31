import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("bank_transactions", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.uuid("idMoeda").notNullable().references("id").inTable("currencies");
    table.double("quantidade").notNullable();
    table.double("cotacaoMoeda").notNullable();
    table.string("responsavel").notNullable();
    table.string("observacao");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("bank_transactions");
}
