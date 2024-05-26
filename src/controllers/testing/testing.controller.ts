import { setDB } from "../../db/db";
import { Request, Response } from "express";

export const deleteAllData = (request: Request, response: Response) => {
  setDB();

  response.status(204).send();
}