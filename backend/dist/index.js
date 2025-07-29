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
const express_1 = __importDefault(require("express"));
const userSchema_1 = require("./auth/userSchema");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AuthRoutes_1 = require("./auth/AuthRoutes");
const userRoutes_1 = require("./user/userRoutes");
const linkRoutes_1 = require("./link/linkRoutes");
const userMiddleware_1 = require("./middlewares/userMiddleware");
const contentRoutes_1 = require("./content/contentRoutes");
const tagRoutes_1 = require("./tags/tagRoutes");
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_URI).then(() => { console.log("Connection Successfull"); }).catch((e) => { console.log("Some error happened " + e); });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.get("/", (req, res) => {
    res.send("Hey Welcome to MyBrain App.");
});
//Auth Routes
app.use("/api/auth", AuthRoutes_1.AuthRoutes);
//User Routes
app.use("/api/user", userMiddleware_1.UserMiddleware, userRoutes_1.userRoutes);
//Link Routes
app.use("/api/link", userMiddleware_1.UserMiddleware, linkRoutes_1.LinkRoutes);
//Content Routes
app.use("/api/content", userMiddleware_1.UserMiddleware, contentRoutes_1.ContentRoutes);
//Tag Routes
app.use("/api/tags", userMiddleware_1.UserMiddleware, tagRoutes_1.TagRoutes);
app.get("/api/user-info", userMiddleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email;
    const user = yield userSchema_1.UserModel.findOne({
        "email": email
    });
    if (!user) {
        return res.status(404).json({ "message": "User not found" });
    }
    return res.status(200).json({ "firstName": user.firstName });
}));
app.listen(process.env.PORT, () => {
    console.log(`http://localhost:3000`);
});
