"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = mongoose_1.default.SchemaTypes.ObjectId;
const LinkSchema = new Schema({
    link: {
        type: String,
        unique: true
    },
    userId: {
        type: ObjectId,
        require: true,
        ref: 'users'
    }
});
const LinkModel = mongoose_1.default.model("link", LinkSchema);
exports.LinkModel = LinkModel;
