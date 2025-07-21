"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const AuthControllers_1 = require("./AuthControllers");
const AuthRoutes = (0, express_1.Router)();
exports.AuthRoutes = AuthRoutes;
AuthRoutes.post("/signup", AuthControllers_1.userSignupController);
AuthRoutes.post("/login", AuthControllers_1.userLoginController);
