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
var Home = function () {
    var _a = (0, authContext_1.useAuth)(), isAuthenticated = _a.isAuthenticated, userId = _a.userId;
    var _b = (0, react_1.useState)([]), projects = _b[0], setProjects = _b[1];
    var _c = (0, react_1.useState)(''), notification = _c[0], setNotification = _c[1];
    (0, react_1.useEffect)(function () {
        if (isAuthenticated && userId) {
            fetch("http://localhost:3001/api/projects?userId=".concat(userId))
                .then(function (response) { return response.json(); })
                .then(function (data) {
                if (Array.isArray(data)) {
                    setProjects(data);
                    setNotification('Projetos carregados com sucesso!');
                    setTimeout(function () { return setNotification(''); }, 5000); // Remove a notificação após 5 segundos
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
      <NavBar_1.default projects={projects} userId={userId} userName={''}/>
      <div className="flex-1 flex flex-col">
        <MainContent_1.default projects={projects}>
          {notification && (<div className="bg-green-500 text-white p-4 rounded mb-4 transition-opacity duration-150 ease-in-out">
              {notification}
            </div>)}
          {projects.length === 0 ? (<div className="flex-1 flex flex-col items-center justify-center p-4">
              <h1 className="text-4xl font-bold mb-8">Seus Projetos</h1>
              <p className="mb-4">Aqui você pode gerenciar seus projetos e tarefas.</p>
            </div>) : (<div className="flex-1 flex flex-col items-center justify-center p-4">
              <h1 className="text-4xl font-bold mb-8">Projetos</h1>
              <p className="mb-4">Aqui você pode visualizar e gerenciar seus projetos.</p>
            </div>)}
        </MainContent_1.default>
      </div>
    </div>);
};
exports.default = Home;
