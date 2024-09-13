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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Projects = function () {
    var _a = (0, react_1.useState)([]), projects = _a[0], setProjects = _a[1];
    var _b = (0, react_1.useState)(''), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)(''), description = _c[0], setDescription = _c[1];
    //   const router = useRouter();
    (0, react_1.useEffect)(function () {
        fetch('http://localhost:3001/api/projects')
            .then(function (response) { return response.json(); })
            .then(function (data) { return setProjects(data); });
    }, []);
    var handleCreate = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, newProject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, fetch('http://localhost:3001/api/projects', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ name: name, description: description }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    newProject = _a.sent();
                    setProjects(__spreadArray(__spreadArray([], projects, true), [newProject], false));
                    setName('');
                    setDescription('');
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Projetos</h1>
      <form onSubmit={handleCreate} className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm mb-8">
        <div className="mb-4">
          <input type="text" placeholder="Nome do Projeto" value={name} onChange={function (e) { return setName(e.target.value); }} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"/>
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Descrição do Projeto" value={description} onChange={function (e) { return setDescription(e.target.value); }} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"/>
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Criar Projeto</button>
      </form>
      <div className="w-full max-w-2xl">
        {projects.map(function (project) { return (<div key={project.id} className="bg-gray-800 p-4 rounded shadow-md mb-4">
            <h2 className="text-2xl font-bold">{project.name}</h2>
            <p>{project.description}</p>
          </div>); })}
      </div>
    </div>);
};
exports.default = Projects;
