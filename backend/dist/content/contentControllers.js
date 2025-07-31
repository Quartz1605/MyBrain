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
exports.deleteContentController = exports.shareLinkController = exports.setContentController = exports.getContentController = void 0;
const userSchema_1 = require("../auth/userSchema");
const contentSchema_1 = require("./contentSchema");
const tagSchema_1 = require("../tags/tagSchema");
const setContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email;
    try {
        const userExists = yield userSchema_1.UserModel.findOne({
            "email": email
        });
        if (!userExists) {
            return res.status(404).json({ "message": "User doesn't exist" });
        }
        const selectedTagIds = Array.isArray(req.body.selectedTags) ? req.body.selectedTags : [req.body.selectedTags];
        const tags = yield tagSchema_1.TagsModel.find({ _id: { $in: selectedTagIds } });
        if (!tags || tags.length === 0) {
            return res.status(404).json({ "message": "Tag(s) don't exist" });
        }
        const tagIds = tags.map(tag => tag._id);
        const tagNames = tags.map(tag => tag.title);
        const content = yield contentSchema_1.ContentModel.create({
            link: req.body.link,
            type: req.body.type,
            title: req.body.title,
            tags: tagIds,
            tagName: tagNames,
            userId: userExists._id,
            description: req.body.description
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
        const contents = yield contentSchema_1.ContentModel.find({
            userId: userExists._id
        });
        if (!contents) {
            return res.status(403).json({ "message": "Error fetching contents to main page." });
        }
        return res.status(200).json({ "contents": contents });
    }
    catch (e) {
        return res.status(400).json({ "message": "Some backend error happened " + e });
    }
});
exports.getContentController = getContentController;
const shareLinkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield userSchema_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ "message": "User does not exist." });
        }
        if (!userId) {
            return res.status(403).json({ "message": "User not found" });
        }
        const content = yield contentSchema_1.ContentModel.find({
            "userId": userId
        });
        if (!content) {
            return res.status(404).json({ "message": "No links for the current user." });
        }
        else {
            return res.status(200).json({ "content": content, "firstName": user.firstName });
        }
    }
    catch (e) {
        return res.status(404).json({ "message": "Some backend error happened " + e });
    }
});
exports.shareLinkController = shareLinkController;
const deleteContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email;
    try {
        const user = yield userSchema_1.UserModel.findOne({
            "email": email
        });
        if (!user) {
            return res.status(404).json({ "message": "User not found" });
        }
        const id = req.params.id;
        const isDeleted = yield contentSchema_1.ContentModel.deleteOne({
            "_id": id
        });
        if (isDeleted.deletedCount === 1) {
            return res.status(200).json({ "message": "Content Deleted Successfully." });
        }
        else {
            return res.status(400).json({ "message": "Error deleting the Content." });
        }
    }
    catch (e) {
        return res.status(400).json({ "message": "Some backend error happened" + e });
    }
});
exports.deleteContentController = deleteContentController;
