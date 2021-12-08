import { Request, Response } from "express";
import { createSession, findSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // validate user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("invalid email or password");
  }

  // create session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create access-token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("accessTokenTtl") } // 15 minutes for accessToken
  );

  // create refresh-token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("refreshTokenTtl") } // 1 year  for accessToken
  );
  // return access and refresh token

  return res.send({ accessToken, refreshToken });
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const sessions = await findSession({ user: userId, valid: false });
  return res.send(sessions);
};
