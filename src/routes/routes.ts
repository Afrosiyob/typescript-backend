import { updateProductHandler } from "../controller/product.controller";
import { updateProductSchema } from "../schema/product.schema";
import { Express, Request, Response } from "express";
import { createUserSchema } from "../schema/user.schema";
import { createUserHandler } from "../controller/user.controller";
import { requireUser, validate } from "../middleware/middleware";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";
import { createSessionSchema } from "../schema/session.schema";
import {
  createProductSchema,
  getProductSchema,
  deleteProductSchema,
} from "../schema/product.schema";
import {
  createProductHandler,
  getProductHandler,
} from "../controller/product.controller";

const routes = (app: Express) => {
  /**
   * @openapi
   * /check:
   *  get:
   *     tags:
   *     - Check
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   *  post:
   *     tags:
   *     - Check
   */

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
    "/api/products",
    [requireUser, validate(createProductSchema)],
    createProductHandler
  );

  app.put(
    "/api/products/:productId",
    [requireUser, validate(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    validate(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validate(deleteProductSchema)],
    getProductHandler
  );
};

export default routes;
