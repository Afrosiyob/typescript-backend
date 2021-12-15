import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import log from "./logger";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rest api docs",
      version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          schema: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/routes.ts", "./src/schema/*.ts"],
};

const swaggerSpace = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // swagger page

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpace));

  // docs in json
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpace);
  });

  log.info(`doc available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
