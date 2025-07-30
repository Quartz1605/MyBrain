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
exports.getLinkController = void 0;
const userSchema_1 = require("../auth/userSchema");
const linkSchema_1 = require("./linkSchema");
const getLinkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email;
    try {
        if (!email) {
            return res.status(401).json({ "message": "User not found" });
        }
        const user = yield userSchema_1.UserModel.findOne({
            "email": email
        });
        if (!user) {
            return res.status(401).json({ "message": "User not found." });
        }
        const linkExists = yield linkSchema_1.LinkModel.findOne({
            "userId": user._id
        });
        if (!linkExists) {
            const link = yield linkSchema_1.LinkModel.create({
                "link": user._id,
                "userId": user._id
            });
            if (link) {
                return res.status(201).json({ "message": "Link created successfully", "link": `http://localhost:5173/user/${link.link}` });
            }
            else {
                return res.status(400).json({ "message": "Error creating link." });
            }
        }
        else {
            return res.status(200).json({ "link": `http://localhost:5173/user/${linkExists.link}` });
        }
    }
    catch (e) {
        return res.status(400).json({ "message": "Some backend error happened " + e });
    }
});
exports.getLinkController = getLinkController;
