"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = mongoose_1.default.SchemaTypes.ObjectId;
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
});
const UserModel = mongoose_1.default.model("users", UserSchema);
exports.UserModel = UserModel;
