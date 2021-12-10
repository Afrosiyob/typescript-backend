import { DocumentDefinition, FilterQuery } from "mongoose";
import logger from "../utils/logger";
import { omit } from "lodash";
import User, { UserDocument } from "../models/user.model";

export const createUser = async (
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) => {
  try {
    const user = await User.create(input);

    return omit(user.toJSON(), "password");
  } catch (error: any) {
    logger.error(error);
    throw new Error(error);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), "password");
};

export const findUser = async (query: FilterQuery<UserDocument>) =>
  User.findOne(query).lean();
