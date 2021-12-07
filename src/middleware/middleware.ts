import { Express, Request, Response, NextFunction } from "express";

import { AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  };
