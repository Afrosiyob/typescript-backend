import { Express, Request, Response } from "express";
import { createUserSchema } from "./../schema/user.schema";
import { createUserHandler } from "../controller/user.controller";
import { requireUser, validate } from "../middleware/middleware";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";
import { createSessionSchema } from "../schema/session.schema";
import { createProductSchema } from "../schema/product.schema";
import { createProductHandler } from "../controller/product.controller";

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

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/posts",
    [requireUser, validate(createProductSchema)],
    createProductHandler
  );
};

export default routes;
