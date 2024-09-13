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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var authContext_1 = require("@/context/authContext");
var NavBar_1 = __importDefault(require("@/components/NavBar"));
var MainContent_1 = __importDefault(require("@/components/MainContent"));
var link_1 = __importDefault(require("next/link"));
var Home = function () {
    var isAuthenticated = (0, authContext_1.useAuth)().isAuthenticated;
    var _a = (0, react_1.useState)([]), projects = _a[0], setProjects = _a[1];
    (0, react_1.useEffect)(function () {
        if (isAuthenticated) {
            fetch('http://localhost:3001/api/projects')
                .then(function (response) { return response.json(); })
                .then(function (data) { return setProjects(data); });
        }
    }, [isAuthenticated]);
    return (<div className="min-h-screen flex">
      {isAuthenticated && <NavBar_1.default projects={projects}/>}
      <MainContent_1.default>
        <h1 className="text-4xl font-bold mb-8">Home Page</h1>
        {!isAuthenticated ? (<div className="space-x-4">
            <link_1.default href="/auth/login">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
            </link_1.default>
            <link_1.default href="/auth/sign-up">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sign Up</button>
            </link_1.default>
          </div>) : (<div className="text-center">
            <p className="text-xl mb-4">Usuário logado</p>
          </div>)}
      </MainContent_1.default>
    </div>);
};
exports.default = Home;
