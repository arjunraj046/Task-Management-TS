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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../services/jwt");
const typeorm_1 = require("typeorm");
const user_1 = require("../db/models/user");
const authRepository_1 = require("../db/repository/authRepository");
const authenticateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(user_1.UserSchema);
    let token = req.header("Authorization");
    if (token) {
        token = token.replace(/^Bearer\s+/i, "");
    }
    else {
        return res.status(401).json({ message: "Authentication required." });
    }
    const decodeToken = (0, jwt_1.verifyToken)(token);
    let user = yield (0, authRepository_1.findUser_DB)(String(decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.payload));
    if (user) {
        req.user = user;
        next();
    }
    else {
        return res.status(401).json({ message: "Authentication required." });
    }
});
exports.default = authenticateJWT;
