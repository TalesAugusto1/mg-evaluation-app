"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var authContext_1 = require("@/context/authContext");
var link_1 = __importDefault(require("next/link"));
var MainContent = function (_a) {
    var children = _a.children, projects = _a.projects;
    var _b = (0, authContext_1.useAuth)(), name = _b.name, profilePicture = _b.profilePicture, logout = _b.logout;
    // Verificar o valor de profilePicture
    console.log('Profile Picture:', profilePicture);
    return (<div className="flex-1 flex flex-col bg-black text-white relative">
      {/* Header */}
      <div className="flex justify-between items-center w-full p-4 bg-gray-900">
        {/* Nome do usuário */}
        {name && <div className="text-xl">Bem-vindo, {name}!</div>}
        
        {/* Foto de perfil */}
        {profilePicture ? (<img src={"data:image/jpeg;base64,".concat(profilePicture)} // Certifique-se de que a URL base64 está correta
         alt="Foto de Perfil" className="w-12 h-12 rounded-full object-cover" // Adicione object-cover para evitar distorção
        />) : (<div className="w-12 h-12 rounded-full bg-gray-500"></div> // Placeholder quando não há foto
        )}

        {/* Botão de logout */}
        {name && (<button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>)}
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {children}

        {/* Lista de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {projects.map(function (project) { return (<link_1.default key={project.id} href={"/projects/".concat(project.id)} className="hover:underline">
              <div className="bg-gray-800 p-4 rounded shadow-md cursor-pointer hover:bg-gray-700">
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <p>{project.description}</p>
              </div>
            </link_1.default>); })}
        </div>
      </div>
    </div>);
};
exports.default = MainContent;
