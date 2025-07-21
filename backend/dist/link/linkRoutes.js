"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkRoutes = void 0;
const express_1 = require("express");
const linkControllers_1 = require("./linkControllers");
const LinkRoutes = (0, express_1.Router)();
exports.LinkRoutes = LinkRoutes;
LinkRoutes.get("/get-link", linkControllers_1.getLinkController);
