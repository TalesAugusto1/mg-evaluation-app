"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var MainContent = function (_a) {
    var children = _a.children;
    return (<div className="flex-1 flex flex-col items-center justify-center bg-black text-white">
      {children}
    </div>);
};
exports.default = MainContent;
