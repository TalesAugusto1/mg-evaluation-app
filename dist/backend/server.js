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
var express_1 = __importDefault(require("express"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cors_1 = __importDefault(require("cors"));
var client_1 = require("@prisma/client");
var app = (0, express_1.default)();
var prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var users = [];
//e. de usuários
app.post("/api/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, hashedPassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                users.push({ name: name, email: email, password: hashedPassword });
                res.status(201).send("Usuário registrado com sucesso");
                return [2 /*return*/];
        }
    });
}); });
app.post("/api/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, token;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                user = users.find(function (u) { return u.email === email; });
                _b = user;
                if (!_b) return [3 /*break*/, 2];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 1:
                _b = (_c.sent());
                _c.label = 2;
            case 2:
                if (_b) {
                    token = jsonwebtoken_1.default.sign({ email: user.email }, "secreta", {
                        expiresIn: "1h",
                    });
                    res.json({ token: token, name: user.name });
                }
                else {
                    res.status(401).send("Credenciais inválidas");
                }
                return [2 /*return*/];
        }
    });
}); });
//e. de projetos
app.post("/api/projects", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, project;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description;
                return [4 /*yield*/, prisma.project.create({
                        data: { name: name, description: description },
                    })];
            case 1:
                project = _b.sent();
                res.status(201).json(project);
                return [2 /*return*/];
        }
    });
}); });
app.get("/api/projects", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.project.findMany()];
            case 1:
                projects = _a.sent();
                res.json(projects);
                return [2 /*return*/];
        }
    });
}); });
app.get("/api/projects/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, project;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.project.findUnique({
                        where: { id: Number(id) },
                    })];
            case 1:
                project = _a.sent();
                res.json(project);
                return [2 /*return*/];
        }
    });
}); });
app.put("/api/projects/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, description, project;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, description = _a.description;
                return [4 /*yield*/, prisma.project.update({
                        where: { id: Number(id) },
                        data: { name: name, description: description },
                    })];
            case 1:
                project = _b.sent();
                res.json(project);
                return [2 /*return*/];
        }
    });
}); });
app.delete("/api/projects/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.project.delete({
                        where: { id: Number(id) },
                    })];
            case 1:
                _a.sent();
                res.status(204).send();
                return [2 /*return*/];
        }
    });
}); });
//e. de tarefas (a serem adicionados)
// Iniciar o servidor
app.listen(3001, function () {
    console.log("Servidor rodando na porta 3001");
});
