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
exports.RbaUserACL = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bad_request_1 = require("../../errors/bad-request");
// Role Based Access: User ACL
const RbaUserACL = {
    canCreate: (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.roles.includes("create")) ||
            ((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.roles.includes("all"))) {
            next();
        }
        else {
            throw new bad_request_1.BadRequestErr("Cannot create.");
        }
    })),
    canEdit: (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        if (((_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.roles.includes("edit")) ||
            ((_d = req.currentUser) === null || _d === void 0 ? void 0 : _d.roles.includes("all"))) {
            next();
        }
        else {
            throw new bad_request_1.BadRequestErr("Cannot Edit.");
        }
    })),
    canDelete: (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        if (((_e = req.currentUser) === null || _e === void 0 ? void 0 : _e.roles.includes("delete")) ||
            ((_f = req.currentUser) === null || _f === void 0 ? void 0 : _f.roles.includes("all"))) {
            next();
        }
        else {
            throw new bad_request_1.BadRequestErr("Cannot Delete.");
        }
    })),
    canReadOnly: (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h;
        if (((_g = req.currentUser) === null || _g === void 0 ? void 0 : _g.roles.includes("readOnly")) ||
            ((_h = req.currentUser) === null || _h === void 0 ? void 0 : _h.roles.includes("all"))) {
            next();
        }
        else {
            throw new bad_request_1.BadRequestErr("Not Authorized.");
        }
    })),
    isAdmin: (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _j;
        if ((_j = req.currentUser) === null || _j === void 0 ? void 0 : _j.roles.includes("all")) {
            next();
        }
        else {
            throw new bad_request_1.BadRequestErr("Not Authorized as Admin.");
        }
    })),
};
exports.RbaUserACL = RbaUserACL;
