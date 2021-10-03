import config from "config";
import jwt from "jsonwebtoken";

import log from "../logger";

// TODO: Store this in a secure place like vault or AWS KMS.
const privateKey = config.get("privateKey") as string;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    let errorMessage = "Error decoding the token";
    let tokenExpired = false;
    if (error instanceof Error) {
        errorMessage = `${errorMessage}: ${error.message}`;
        tokenExpired = error.message == "jwt expired";
        log.error(errorMessage);
    }
    return {
      valid: false,
      expired: tokenExpired,
      decoded: null,
    };
  }
}