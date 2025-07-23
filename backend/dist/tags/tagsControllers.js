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
exports.createTag = exports.getTags = void 0;
const tagSchema_1 = require("./tagSchema");
const userSchema_1 = require("../auth/userSchema");
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email;
    try {
        const userExists = yield userSchema_1.UserModel.findOne({
            "email": email
        });
        if (!userExists) {
            return res.status(404).json({ "message": "User doesn't exist" });
        }
        const tag = yield tagSchema_1.TagsModel.create({
            title: req.body.title,
        });
        if (!tag) {
            return res.status(403).json({ "message": "Error creating a tag." });
        }
        return res.status(201).json({ "message": "Tag added successfully." });
    }
    catch (e) {
        return res.status(400).json({ "message": "Some backend error happened " + e });
    }
});
exports.createTag = createTag;
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email;
    try {
        const tags = yield tagSchema_1.TagsModel.find({});
        if (!tags) {
            return res.status(403).json({ "message": "Error fetching tags" });
        }
        return res.status(200).json({ "tags": tags });
    }
    catch (e) {
        return res.status(400).json({ "message": "Some backend error happened " + e });
    }
});
exports.getTags = getTags;
