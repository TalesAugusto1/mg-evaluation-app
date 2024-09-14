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
    var _a = (0, authContext_1.useAuth)(), isAuthenticated = _a.isAuthenticated, userId = _a.userId;
    var _b = (0, react_1.useState)([]), projects = _b[0], setProjects = _b[1];
    (0, react_1.useEffect)(function () {
        if (isAuthenticated) {
            fetch("http://localhost:3001/api/projects?userId=".concat(userId))
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log('Fetched projects:', data);
                if (Array.isArray(data)) {
                    setProjects(data);
                }
                else {
                    console.error('Data fetched is not an array');
                    setProjects([]);
                }
            })
                .catch(function (error) {
                console.error('Failed to fetch projects:', error);
                setProjects([]);
            });
        }
        else {
            setProjects([]);
        }
    }, [isAuthenticated, userId]);
    return (<div className="min-h-screen flex">
      {isAuthenticated && <NavBar_1.default projects={projects}/>}
      <MainContent_1.default projects={projects}>
        {!isAuthenticated ? (<div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Nosso Site</h1>
            <p className="mb-4">Aqui você pode gerenciar seus projetos e tarefas de forma eficiente.</p>
            <p className="mb-4">Faça login ou cadastre-se para começar a usar todas as funcionalidades.</p>
            <div className="space-x-4">
              <link_1.default href="/auth/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
              </link_1.default>
              <link_1.default href="/auth/sign-up">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sign Up</button>
              </link_1.default>
            </div>
          </div>) : (<div className="text-center">
            {/* Place any additional content for logged-in users here */}
          </div>)}
      </MainContent_1.default>
    </div>);
};
exports.default = Home;
