"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRoutes = void 0;
const express_1 = require("express");
const contentControllers_1 = require("./contentControllers");
const ContentRoutes = (0, express_1.Router)();
exports.ContentRoutes = ContentRoutes;
ContentRoutes.post("/create-link", contentControllers_1.setContentController);
ContentRoutes.get("/get-all-links", contentControllers_1.getContentController);
