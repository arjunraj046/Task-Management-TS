import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { findUser_DB, registerUser_DB } from "../db/repository/authRepository";
import { passwordComparing, passwordHashing } from "../services/bcrypt";
import { generateToken } from "../services/jwt";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  console.log("registerUser");
  
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Bad Request: Username and password are required." });
      return;
    }
    const saltPassword = await passwordHashing(password);
    console.log(saltPassword);
    
    if (saltPassword !== null) {
      const registrationSuccessful = await registerUser_DB(username, saltPassword);
      if (registrationSuccessful) {
        res.status(201).json({ message: "User registered successfully" });
      } else {
        res.status(500).json({ error: "Internal Server Error: Failed to register the user." });
      }
    } else {
      res.status(500).json({ error: "Internal Server Error: Password hashing failed." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: An error occurred while registering the user" });
  }
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Bad Request: Username and password are required." });
    return;
  }
  try {
    const user: any = await findUser_DB(username);
    if (!user) {
      res.status(401).json({ error: "Unauthorized: User not found." });
      return;
    }
    const isPasswordValid = await passwordComparing(user.password, password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Unauthorized: Incorrect password." });
      return;
    }
    const JWTtoken = generateToken(user.username);
    
    res.status(200).json({ message: "User logged in successfully", token: JWTtoken });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Internal Server Error: An error occurred while logging in" });
  }
});
