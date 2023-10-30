import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt";
import { JwtPayload } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { UserSchema } from "../db/models/user";
import { findUser_DB } from "../db/repository/authRepository";

declare module "express" {
  export interface Request {
    user?: UserSchema;
  }
}

const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(UserSchema);

  let token = req.header("Authorization");
  if (token) {
    token = token.replace(/^Bearer\s+/i, "");
  } else {
    return res.status(401).json({ message: "Authentication required." });
  }
  const decodeToken: JwtPayload | null = verifyToken(token) as JwtPayload;

  let user = await findUser_DB(String(decodeToken?.payload));
  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(401).json({ message: "Authentication required." });
  }
};

export default authenticateJWT;
