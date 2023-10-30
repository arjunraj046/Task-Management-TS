"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authRepository_1 = require("../db/repository/authRepository");
const bcrypt_1 = require("../services/bcrypt");
const jwt_1 = require("../services/jwt");
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("registerUser");
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: "Bad Request: Username and password are required." });
            return;
        }
        const saltPassword = yield (0, bcrypt_1.passwordHashing)(password);
        console.log(saltPassword);
        if (saltPassword !== null) {
            const registrationSuccessful = yield (0, authRepository_1.registerUser_DB)(username, saltPassword);
            if (registrationSuccessful) {
                res.status(201).json({ message: "User registered successfully" });
            }
            else {
                res.status(500).json({ error: "Internal Server Error: Failed to register the user." });
            }
        }
        else {
            res.status(500).json({ error: "Internal Server Error: Password hashing failed." });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error: An error occurred while registering the user" });
    }
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Bad Request: Username and password are required." });
        return;
    }
    try {
        const user = yield (0, authRepository_1.findUser_DB)(username);
        if (!user) {
            res.status(401).json({ error: "Unauthorized: User not found." });
            return;
        }
        const isPasswordValid = yield (0, bcrypt_1.passwordComparing)(user.password, password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Unauthorized: Incorrect password." });
            return;
        }
        const JWTtoken = (0, jwt_1.generateToken)(user.username);
        res.status(200).json({ message: "User logged in successfully", token: JWTtoken });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error: An error occurred while logging in" });
    }
}));
