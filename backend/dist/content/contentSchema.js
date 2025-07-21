"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = mongoose_1.default.SchemaTypes.ObjectId;
const ContentSchema = new Schema({
    link: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['image', 'video', 'article', 'audio']
    },
    title: {
        type: String,
        required: true
    },
    tags: [{
            type: ObjectId,
            ref: 'tags'
        }],
    userId: {
        type: ObjectId,
        ref: 'users'
    }
});
const ContentModel = mongoose_1.default.model("content", ContentSchema);
exports.ContentModel = ContentModel;
