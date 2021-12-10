import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";
import { verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
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

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "id")) return false;

  const session = await Session.findById(get(decoded, "_id"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;
};
