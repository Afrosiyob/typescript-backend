import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");
  return await mongoose
    .connect(dbUri)
    .then(() => logger.info("Connected to db"))
    .catch((error) => {
      logger.error("Could not connect to db", error);
      process.exit(1);
    });
};

export default connect;
