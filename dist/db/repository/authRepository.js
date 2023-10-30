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
exports.findUser_DB = exports.registerUser_DB = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const registerUser_DB = (Username, saltPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(user_1.UserSchema);
    const newUser = userRepository.create({
        username: Username,
        password: saltPassword,
    });
    try {
        const savedUser = yield userRepository.save(newUser);
        return savedUser;
    }
    catch (error) {
        console.error("Error registering user:", error);
        return null;
    }
});
exports.registerUser_DB = registerUser_DB;
const findUser_DB = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(user_1.UserSchema);
    try {
        const options = {
            where: { username: username },
        };
        const response = yield userRepository.findOne(options);
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.findUser_DB = findUser_DB;
