"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRoutes = void 0;
const express_1 = require("express");
const tagsControllers_1 = require("./tagsControllers");
const TagRoutes = (0, express_1.Router)();
exports.TagRoutes = TagRoutes;
TagRoutes.post("/create-tag", tagsControllers_1.createTag);
TagRoutes.get("/get-all-tags", tagsControllers_1.getTags);
