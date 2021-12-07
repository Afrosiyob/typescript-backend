import { Express, Request, Response } from "express";
import { createUserSchema } from "./../schema/user.schema";
import { createUserHandler } from "../controller/user.controller";
import { validate } from "../middleware/middleware";

const routes = (app: Express) => {
  app.get("/check", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/user", validate(createUserSchema), createUserHandler);
};

export default routes;
