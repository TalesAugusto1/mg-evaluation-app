"use strict";
// src/components/NavBar.tsx
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var authContext_1 = require("@/context/authContext");
var link_1 = __importDefault(require("next/link"));
var NavBar = function (_a) {
    var projects = _a.projects;
    var _b = (0, authContext_1.useAuth)(), user = _b.user, logout = _b.logout;
    return (<nav className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
      <div>
        <div className="text-center">
          <p className="text-xl mb-4">Bem-vindo, {user === null || user === void 0 ? void 0 : user.name}!</p>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Projetos</h2>
        <ul>
          {projects.map(function (project) { return (<li key={project.id} className="mb-2">
              <link_1.default href={"/projects/".concat(project.id)} className="hover:underline">
                {project.name}
              </link_1.default>
            </li>); })}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Páginas</h2>
        <ul>
          <li className="mb-2">
            <link_1.default href="/" className="hover:underline">
              Home
            </link_1.default>
          </li>
          <li className="mb-2">
            <link_1.default href="/projects" className="hover:underline">
              Projetos
            </link_1.default>
          </li>
          {/* espaço para mais links */}
        </ul>
      </div>
    </nav>);
};
exports.default = NavBar;
