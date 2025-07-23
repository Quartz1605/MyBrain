"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TagSchema = new Schema({
    title: {
        type: String
    }
});
const TagsModel = mongoose_1.default.model("tags", TagSchema);
exports.TagsModel = TagsModel;
