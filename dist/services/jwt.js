"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    const token = jsonwebtoken_1.default.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "2d" });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return decodedToken;
};
exports.verifyToken = verifyToken;
