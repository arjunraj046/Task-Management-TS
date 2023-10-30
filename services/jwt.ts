import jwt from "jsonwebtoken";

export const generateToken = (payload: string): string => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET!, {expiresIn: "2d"  });
  return token;
};

export const verifyToken = (token: string) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
  return decodedToken;
};
