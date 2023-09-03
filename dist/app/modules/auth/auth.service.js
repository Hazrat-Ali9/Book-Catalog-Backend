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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const users_service_1 = require("../users/users.service");
const signup = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user already exists
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    if (existingUser) {
        throw new Error('User already exists');
    }
    user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bycrypt_salt_rounds));
    const result = yield prisma_1.default.user.create({
        data: user,
        select: users_service_1.excludePassword,
    });
    return result;
});
const signin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }
    const { id: userId, role } = user;
    const token = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return token;
});
exports.AuthService = {
    signup,
    signin,
};
