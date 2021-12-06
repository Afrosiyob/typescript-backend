import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";

const app = express();
const PORT = config.get<number>("port") || 5000;

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT} `);
  await connect();
});
