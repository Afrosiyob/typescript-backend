import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";

export const createSession = async (
  userId: string | any,
  userAgent: string
) => {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
};

export const findSession = (query: FilterQuery<SessionDocument>) =>
  Session.find(query).lean();

export const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => Session.updateOne(query, update);
