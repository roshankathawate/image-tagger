import { get } from "lodash";
import { Request, Response, NextFunction } from "express";

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = get(req, "user");

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default authenticateUser;