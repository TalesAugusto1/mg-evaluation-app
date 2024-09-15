"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var image_1 = __importDefault(require("next/image"));
var link_1 = __importDefault(require("next/link"));
var UserProfile = function (_a) {
    var userId = _a.userId;
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        var fetchUser = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        console.log('Fetching user with ID:', userId);
                        return [4 /*yield*/, fetch("http://localhost:3001/api/users/".concat(userId))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Error fetching user data: ".concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        console.log('Fetched user data:', data);
                        setUser(data);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Erro ao buscar perfil do usuário:", error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchUser();
    }, [userId]);
    if (loading)
        return <p className="text-center text-lg text-gray-400">Loading...</p>;
    if (!user)
        return <p className="text-center text-lg text-gray-400">Usuário não encontrado</p>;
    var profilePictureSrc = user.profilePicture
        ? "data:".concat(user.profilePicture.type, ";base64,").concat(Buffer.from(user.profilePicture.data).toString('base64'))
        : '';
    return (<div className="min-h-screen flex flex-col items-center p-6 bg-gray-900 text-white">
      <div className="max-w-3xl w-full bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6"> 
          {user.profilePicture ? (<div className="relative w-24 h-24">
              <image_1.default src={profilePictureSrc} alt={"".concat(user.name, "'s profile")} width={96} height={96} layout="fixed" className="rounded-full border-4 border-blue-600 object-cover"/>
            </div>) : (<div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-gray-400">
              No Image
            </div>)}
          <h1 className="text-4xl font-bold text-gray-100 mt-12">{user.name}</h1>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 text-gray-300">Estatísticas de Tarefas</h2>
          <p className="text-lg mb-2"><strong>Todo:</strong> {user.taskStatistics.todo}</p>
          <p className="text-lg mb-2"><strong>Em Andamento:</strong> {user.taskStatistics.inProgress}</p>
          <p className="text-lg"><strong>Concluídas:</strong> {user.taskStatistics.done}</p>
        </div>
      </div>
      <div className="mt-6">
        <link_1.default href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Voltar para Home
        </link_1.default>
      </div>
    </div>);
};
exports.default = UserProfile;
