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
exports.setContentController = exports.getContentController = void 0;
const userSchema_1 = require("../auth/userSchema");
const contentSchema_1 = require("./contentSchema");
const setContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email;
    try {
        const userExists = yield userSchema_1.UserModel.findOne({
            "email": email
        });
        if (!userExists) {
            return res.status(404).json({ "message": "User doesn't exist" });
        }
        const content = yield contentSchema_1.ContentModel.create({
            link: req.body.link,
            type: req.body.type,
            title: req.body.title,
            tags: req.body.tags,
            userId: userExists._id
        });
        if (!content) {
            return res.status(403).json({ "message": "Error adding link to brain" });
        }
        return res.status(201).json({ "message": "Link added successfully to brain." });
    }
    catch (e) {
        return res.status(400).json({ "message": "Some backend error happened " + e });
    }
});
exports.setContentController = setContentController;
const getContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email;
    try {
        const userExists = yield userSchema_1.UserModel.findOne({
            "email": email
        });
        if (!userExists) {
            return res.status(404).json({ "message": "User doesn't exist" });
        }
        const contents = yield contentSchema_1.ContentModel.find({});
        if (!contents) {
            return res.status(403).json({ "message": "Error fetching contents to main page." });
        }
        return res.status(201).json({ "contents": contents });
    }
    catch (e) {
        return res.status(400).json({ "message": "Some backend error happened " + e });
    }
});
exports.getContentController = getContentController;
