import { Request, Response } from "express";
import knex from "../database/connection";
import { Currency } from "../models/Currency";

export default class CurrenciesController {
  async listAll(request: Request, response: Response) {
    const currency_list = await knex<Currency>("currencies").select("*");
    return response.status(200).json(currency_list);
  }
}
