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
exports.userLoginController = exports.userSignupController = void 0;
const userSchema_1 = require("./userSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const maxAge = 20 * 24 * 60 * 60 * 100;
const createToken = (email) => {
    return jsonwebtoken_1.default.sign({ "email": email }, process.env.JWT_SECRET, { expiresIn: maxAge });
};
const userSignupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ "message": "Email not provided" });
    }
    try {
        const userExist = yield userSchema_1.UserModel.findOne({ "email": email });
        if (userExist) {
            return res.status(411).json({ "message": "User already exists,Pls Login." });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 4);
        req.body.password = hashPassword;
        const user = yield userSchema_1.UserModel.create(req.body);
        if (user) {
            res.cookie("jwt", createToken(email), {
                maxAge,
                secure: true,
                sameSite: 'none'
            });
            return res.status(201).json({ "message": "User created successfully.", "user": user });
        }
        else {
            return res.status(400).json({ "message": "Error creating user." });
        }
    }
    catch (e) {
        return res.status(400).json({ "message": "Some backend error " + e });
    }
});
exports.userSignupController = userSignupController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ "message": "email, password are mandatory." });
    }
    const user = yield userSchema_1.UserModel.findOne({
        "email": email
    });
    if (!user) {
        return res.status(401).json({ "message": "User does not exist. Pls Signup First." });
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
    if (isPasswordCorrect) {
        res.cookie("jwt", createToken(email), {
            maxAge,
            secure: true,
            sameSite: "none"
        });
        return res.status(200).json({ "message": "Welcome", "user": user });
    }
    else {
        return res.status(403).json({ "message": "Password is incorrect" });
    }
});
exports.userLoginController = userLoginController;
