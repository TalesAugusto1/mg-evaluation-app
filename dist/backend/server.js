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
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, cors_1.default)());
// Função para converter base64 para buffer
var base64ToBuffer = function (base64) {
    var base64Data = base64.split(",")[1];
    return Buffer.from(base64Data, "base64");
};
// Função para converter buffer para base64
var bufferToBase64 = function (buffer) {
    return "data:image/jpeg;base64,".concat(buffer.toString("base64"));
};
// Registro de usuário
app.post("/api/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, profilePicture, profilePictureBuffer, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password, profilePicture = _a.profilePicture;
                profilePictureBuffer = void 0;
                if (profilePicture) {
                    profilePictureBuffer = base64ToBuffer(profilePicture);
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            name: name_1,
                            email: email,
                            password: hashedPassword,
                            profilePicture: profilePictureBuffer, // Armazenar como BLOB
                        },
                    })];
            case 2:
                user = _b.sent();
                res.status(201).json(user);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("Erro ao registrar usuário:", error_1);
                res.status(500).json({ error: "Erro ao registrar usuário" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Login de usuário
app.post("/api/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, token, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
            case 2:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 4];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 3:
                _b = (_c.sent());
                _c.label = 4;
            case 4:
                if (_b) {
                    token = jsonwebtoken_1.default.sign({ email: user.email, userId: user.id }, "secreta", {
                        expiresIn: "1h",
                    });
                    res.json({
                        token: token,
                        name: user.name,
                        userId: user.id,
                        profilePicture: user.profilePicture
                            ? bufferToBase64(user.profilePicture)
                            : undefined,
                    });
                }
                else {
                    res.status(401).send("Credenciais inválidas");
                }
                return [3 /*break*/, 6];
            case 5:
                error_2 = _c.sent();
                console.error("Erro ao fazer login:", error_2);
                res.status(500).send("Erro interno do servidor");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Criar projeto
app.post("/api/projects", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, userId, user, project, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description, userId = _a.userId;
                if (!userId) {
                    return [2 /*return*/, res.status(400).json({ error: "userId é necessário" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: userId },
                    })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ error: "Usuário não encontrado" })];
                }
                return [4 /*yield*/, prisma.project.create({
                        data: { name: name, description: description, userId: userId },
                    })];
            case 3:
                project = _b.sent();
                res.status(201).json(project);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.error("Erro ao criar projeto:", error_3);
                res.status(500).send("Erro interno do servidor");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Buscar todos os projetos de um usuário
app.get("/api/projects", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, projects, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.query.userId;
                if (!userId) {
                    return [2 /*return*/, res.status(400).json({ error: "userId é necessário" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.project.findMany({
                        where: { userId: userId },
                    })];
            case 2:
                projects = _a.sent();
                res.json(projects);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Erro ao buscar projetos:", error_4);
                res.status(500).send("Erro interno do servidor");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Buscar detalhes de um projeto, incluindo tarefas
app.get("/api/projects/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, project, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.project.findUnique({
                        where: { id: id },
                        include: { tasks: true }, // Incluindo as tarefas associadas ao projeto
                    })];
            case 2:
                project = _a.sent();
                if (project) {
                    res.json(project);
                }
                else {
                    res.status(404).send("Projeto não encontrado");
                }
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error("Erro ao buscar projeto:", error_5);
                res.status(500).send("Erro interno do servidor");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Atualizar projeto
app.put("/api/projects/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, description, project, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.project.update({
                        where: { id: id },
                        data: { name: name, description: description },
                    })];
            case 2:
                project = _b.sent();
                res.json(project);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                console.error("Erro ao atualizar projeto:", error_6);
                res.status(500).send("Erro interno do servidor");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Deletar projeto
app.delete("/api/projects/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.project.delete({
                        where: { id: id },
                    })];
            case 2:
                _a.sent();
                res.status(204).send();
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error("Erro ao deletar projeto:", error_7);
                res.status(500).send("Erro interno do servidor");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Criar tarefa
app.post("/api/projects/:projectId/tasks", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, _a, name, description, userId, status, dueDate, newTask, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                projectId = req.params.projectId;
                _a = req.body, name = _a.name, description = _a.description, userId = _a.userId, status = _a.status, dueDate = _a.dueDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.task.create({
                        data: {
                            name: name,
                            description: description,
                            userId: userId,
                            projectId: projectId,
                            status: status,
                            dueDate: new Date(dueDate),
                        },
                    })];
            case 2:
                newTask = _b.sent();
                res.json(newTask);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _b.sent();
                res.status(500).json({ error: "Failed to create task" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Editar tarefa
app.put("/api/tasks/:taskId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, _a, name, description, status, dueDate, updatedTask, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                taskId = req.params.taskId;
                _a = req.body, name = _a.name, description = _a.description, status = _a.status, dueDate = _a.dueDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.task.update({
                        where: { id: taskId },
                        data: {
                            name: name,
                            description: description,
                            status: status, // Novo campo
                            dueDate: new Date(dueDate), // Novo campo
                        },
                    })];
            case 2:
                updatedTask = _b.sent();
                res.json(updatedTask);
                return [3 /*break*/, 4];
            case 3:
                error_9 = _b.sent();
                res.status(500).json({ error: "Failed to update task" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Deletar tarefa
app.delete("/api/tasks/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.task.delete({
                        where: { id: id },
                    })];
            case 2:
                _a.sent();
                res.status(204).send();
                return [3 /*break*/, 4];
            case 3:
                error_10 = _a.sent();
                console.error("Erro ao deletar tarefa:", error_10);
                res.status(500).json({ error: "Erro ao deletar tarefa" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Buscar todas as tarefas de um projeto
app.get("/api/projects/:projectId/tasks", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, tasks, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = req.params.projectId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.task.findMany({
                        where: { projectId: projectId },
                    })];
            case 2:
                tasks = _a.sent();
                res.json(tasks);
                return [3 /*break*/, 4];
            case 3:
                error_11 = _a.sent();
                res.status(500).json({ error: "Failed to fetch tasks" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(3001, function () {
    console.log("Servidor rodando na porta 3001");
});
