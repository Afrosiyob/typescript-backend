import { FilterQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";

export const createSession = async (
  userId: string | any,
  userAgent: string
) => {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
};

export const findSession = async (query: FilterQuery<SessionDocument>) =>
  Session.find(query).lean();
