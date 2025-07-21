"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const userController_1 = require("./userController");
const express_1 = require("express");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.get("/get-user", userController_1.getUserinfoContoller);
