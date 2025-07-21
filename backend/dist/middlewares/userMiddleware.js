"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send('You are not authenticated.');
    }
    try {
        const isVerified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.email = isVerified.email;
        next();
    }
    catch (err) {
        return res.status(403).send('Token is invalid or expired');
    }
};
exports.UserMiddleware = UserMiddleware;
