"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var link_1 = __importDefault(require("next/link"));
var fa_1 = require("react-icons/fa"); // Importa ícones da biblioteca React Icons
var NavBar = function (_a) {
    var projects = _a.projects, userId = _a.userId;
    return (<nav className="w-64 bg-gray-800 text-white p-4 flex flex-col h-screen">
      {/* Seção de Projetos */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <fa_1.FaProjectDiagram className="text-blue-400 mr-2"/> Projetos
        </h2>

        <div className="w-full h-1 bg-gray-400 bg-opacity-50 rounded mb-4"></div>

        {/* Contêiner com scroll e altura máxima para a lista de projetos */}
        <div className="flex-1 max-h-80 overflow-y-auto"> {/* Ajuste o valor conforme necessário */}
          <ul>
            {projects.map(function (project) { return (<li key={project.id} className="mb-2">
                <link_1.default href={"/projects/".concat(project.id)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
                  <span>{project.name}</span>
                </link_1.default>
              </li>); })}
          </ul>
        </div>
      </div>

      {/* Seção de Páginas */}
      <div>
        <div className="w-full h-1 bg-gray-400 bg-opacity-50 rounded mb-4"></div>
        <h2 className="text-xl font-bold mb-2 flex items-center">
          <fa_1.FaHome className="text-green-400 mr-2"/> Páginas
        </h2>
        <ul>
          <li className="mb-2">
            <link_1.default href="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <fa_1.FaHome />
              <span>Home</span>
            </link_1.default>
          </li>
          <li className="mb-2">
            <link_1.default href="/projects" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <fa_1.FaProjectDiagram />
              <span>Projetos</span>
            </link_1.default>
          </li>
          <li className="mb-2">
            <link_1.default href={"/users/".concat(userId)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700">
              <fa_1.FaUser />
              <span>Meu Perfil</span>
            </link_1.default>
          </li>
        </ul>
      </div>
    </nav>);
};
exports.default = NavBar;
