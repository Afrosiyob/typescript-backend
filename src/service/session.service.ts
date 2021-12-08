import Session from "../models/session.model";

export const createSession = async (
  userId: string | any,
  userAgent: string
) => {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
};
