import { DocumentDefinition } from "mongoose";

import { UserDocument } from "../interfaces/interfaces";
import User from "../models/user.model";

export const createUser = async (
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) => {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};
