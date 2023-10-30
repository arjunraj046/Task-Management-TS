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
exports.passwordComparing = exports.passwordHashing = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
// Hashing a password
const passwordHashing = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saltRounds = 10;
        let saltPassword = yield bcrypt_1.default.hash(password, saltRounds);
        return saltPassword;
    }
    catch (err) {
        console.error("hashing error", err);
        return null;
    }
});
exports.passwordHashing = passwordHashing;
// passwordComparing function
const passwordComparing = (hashedPassword, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bcrypt_1.default.compare(userPassword, hashedPassword);
        if (result) {
            console.log("Passwords match!");
            return result;
        }
        else {
            console.log("Passwords do not match!");
            return null;
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
});
exports.passwordComparing = passwordComparing;
