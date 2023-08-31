import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("currencies", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("nomeMoeda").notNullable();
    table.string("sigla").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("currencies");
}
