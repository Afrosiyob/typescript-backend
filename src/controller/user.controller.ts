import { Express, Request, Response } from "express";
import logger from "../utils/logger";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};
