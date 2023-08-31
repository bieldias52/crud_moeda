import { Request, Response } from "express";
import knex from "../database/connection";
import { BankTransaction } from "../models/BankTransaction";

export default class MainController {
  async listAll(request: Request, response: Response) {
    const bank_transactions = await knex<BankTransaction>(
      "bank_transactions as b"
    )
      .innerJoin("currencies as c", "b.idMoeda", "=", "c.id")
      .select([
        "b.id",
        "c.nomeMoeda as nomeMoeda",
        "c.id as idMoeda",
        "b.quantidade",
        "b.cotacaoMoeda",
        "b.responsavel",
        "b.observacao",
      ]);
    return response.json(bank_transactions);
  }

  async create(request: Request, response: Response) {
    const bank_transaction = request.body as BankTransaction;

    try {
      const trx = await knex.transaction();
      await trx("bank_transactions").insert({
        idMoeda: bank_transaction.idMoeda,
        quantidade: bank_transaction.quantidade,
        cotacaoMoeda: bank_transaction.cotacaoMoeda,
        responsavel: bank_transaction.responsavel,
        observacao: bank_transaction.observacao,
      });
      await trx.commit();
      return response.status(201).json(request.body);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;
    const changedTransaction = request.body as BankTransaction;

    try {
      const exist = await knex("bank_transactions")
        .where("id", id)
        .select("*")
        .first();

      if (!exist) {
        throw { message: "transaction id not found!" };
      }

      const trx = await knex.transaction();
      await trx("bank_transactions").where("id", id).update({
        idMoeda: changedTransaction.idMoeda,
        quantidade: changedTransaction.quantidade,
        cotacaoMoeda: changedTransaction.cotacaoMoeda,
        responsavel: changedTransaction.responsavel,
        observacao: changedTransaction.observacao,
      });
      trx.commit();

      return response.status(204).end();
    } catch (err) {
      return response.status(404).json(err);
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    console.log(id);

    try {
      const trx = await knex.transaction();
      const result = await trx("bank_transactions").where("id", "=", id).del();
      trx.commit();

      if (result === 0) {
        throw { message: "transaction id not found" };
      }

      return response.status(204).end();
    } catch (err) {
      return response.status(404).json(err);
    }
  }
}
