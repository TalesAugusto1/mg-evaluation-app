"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var router_1 = require("next/router");
var ProjectDetails = function () {
    var router = (0, router_1.useRouter)();
    var id = router.query.id;
    var _a = (0, react_1.useState)(null), project = _a[0], setProject = _a[1];
    (0, react_1.useEffect)(function () {
        if (id) {
            fetch("http://localhost:3001/api/projects/".concat(id))
                .then(function (response) { return response.json(); })
                .then(function (data) { return setProject(data); });
        }
    }, [id]);
    if (!project) {
        return <div>Loading...</div>;
    }
    return (<div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
      <p>{project.description}</p>
    </div>);
};
exports.default = ProjectDetails;
