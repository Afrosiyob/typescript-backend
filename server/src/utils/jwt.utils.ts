import jwt from "jsonwebtoken";

import config from "config";

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, config.get<string>("tokenKey"), options);
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, config.get<string>("tokenKey"));
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
