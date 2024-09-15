"use strict";
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
var link_1 = __importDefault(require("next/link"));
var image_1 = __importDefault(require("next/image"));
var ai_1 = require("react-icons/ai");
var MainContent = function (_a) {
    var children = _a.children, projects = _a.projects;
    var _b = (0, authContext_1.useAuth)(), name = _b.name, profilePicture = _b.profilePicture, logout = _b.logout;
    var _c = (0, react_1.useState)(false), showSuccessMessage = _c[0], setShowSuccessMessage = _c[1];
    var _d = (0, react_1.useState)(false), fadeOut = _d[0], setFadeOut = _d[1];
    (0, react_1.useEffect)(function () {
        if (projects.length > 0) {
            setShowSuccessMessage(true);
            setFadeOut(false);
            var timer_1 = setTimeout(function () {
                setFadeOut(true);
            }, 3000);
            var hideTimer_1 = setTimeout(function () {
                setShowSuccessMessage(false);
            }, 10000);
            return function () {
                clearTimeout(timer_1);
                clearTimeout(hideTimer_1);
            };
        }
    }, [projects]);
    return (<div className="flex-1 flex flex-col bg-black text-white relative min-h-screen">

      <div className="flex justify-between items-center w-full p-4 bg-gray-900">

        <div className="flex-1">
          {name && <div className="text-xl font-semibold">Bem-vindo, {name}!</div>}
        </div>


        <div className="flex items-center space-x-4">
          {profilePicture ? (<div className="w-12 h-12 rounded-full overflow-hidden">
              <image_1.default src={profilePicture} alt="Foto de perfil" width={48} height={48} layout="fixed"/>
            </div>) : (<div className="w-12 h-12 rounded-full bg-gray-500"></div>)}

          {name && (<button onClick={logout} className="p-2 text-red-500 hover:text-red-600 transition-colors duration-300 ease-in-out" aria-label="Logout">
              <ai_1.AiOutlineLogout className="w-6 h-6"/>
            </button>)}
        </div>
      </div>

      {showSuccessMessage && (<div className={"fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50 transition-opacity duration-1500 ease-in-out ".concat(fadeOut ? 'opacity-0' : 'opacity-100')}>
          Projetos carregados com sucesso!
        </div>)}

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {projects.length === 0 ? (<div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Seus Projetos</h1>
            <p>Aqui você pode gerenciar seus projetos e tarefas.</p>
          </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full max-w-6xl justify-start">
            {projects.map(function (project) { return (<link_1.default key={project.id} href={"/projects/".concat(project.id)}>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out aspect-w-1 aspect-h-1">
                  <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
                  <p className="text-gray-300">{project.description}</p>
                </div>
              </link_1.default>); })}
          </div>)}
      </div>
    </div>);
};
exports.default = MainContent;
