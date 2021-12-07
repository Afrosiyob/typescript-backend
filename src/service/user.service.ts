import { DocumentDefinition } from "mongoose";
import logger from "../utils/logger";

import User, { UserDocument } from "../models/user.model";

export const createUser = async (
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) => {
  try {
    return await User.create(input);
  } catch (error: any) {
    logger.error(error);
    throw new Error(error);
  }
};
