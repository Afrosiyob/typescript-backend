import { Express, Request, Response } from "express";
import { createUserSchema } from "./../schema/user.schema";
import { createUserHandler } from "../controller/user.controller";
import { validate } from "../middleware/middleware";
import { createUserSessionHandler } from "../controller/session.controller";
import { createSessionSchema } from "../schema/session.schema";

const routes = (app: Express) => {
  app.get("/check", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/user", validate(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );
};

export default routes;
