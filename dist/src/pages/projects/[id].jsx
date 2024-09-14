"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var router_1 = require("next/router");
var ProjectDetails = function () {
    var router = (0, router_1.useRouter)();
    var id = router.query.id;
    var _a = (0, react_1.useState)(null), project = _a[0], setProject = _a[1];
    var _b = (0, react_1.useState)([]), tasks = _b[0], setTasks = _b[1];
    var _c = (0, react_1.useState)({ name: '', description: '' }), newTask = _c[0], setNewTask = _c[1];
    var _d = (0, react_1.useState)(null), editingTask = _d[0], setEditingTask = _d[1];
    var _e = (0, react_1.useState)(true), loading = _e[0], setLoading = _e[1];
    var _f = (0, react_1.useState)(null), error = _f[0], setError = _f[1];
    (0, react_1.useEffect)(function () {
        if (id) {
            setLoading(true);
            setError(null);
            // Fetch project details
            fetch("http://localhost:3001/api/projects/".concat(id))
                .then(function (response) { return response.json(); })
                .then(function (data) { return setProject(data); })
                .catch(function (err) { return setError('Failed to fetch project details'); })
                .finally(function () { return setLoading(false); });
            // Fetch tasks for the project
            fetch("http://localhost:3001/api/projects/".concat(id, "/tasks"))
                .then(function (response) { return response.json(); })
                .then(function (data) { return setTasks(data); })
                .catch(function (err) { return setError('Failed to fetch tasks'); });
        }
    }, [id]);
    var handleAddTask = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, addedTask, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(id && newTask.name && newTask.description)) return [3 /*break*/, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("http://localhost:3001/api/projects/".concat(id, "/tasks"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(__assign(__assign({}, newTask), { projectId: id, userId: 'someUserId' })),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    addedTask = _a.sent();
                    setTasks(__spreadArray(__spreadArray([], tasks, true), [addedTask], false));
                    setNewTask({ name: '', description: '' }); // Clear the input after successful creation
                    return [3 /*break*/, 5];
                case 4:
                    console.error('Failed to add task');
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error adding task:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    console.error('All fields are required');
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var handleEditTask = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, updatedTask_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editingTask) return [3 /*break*/, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("http://localhost:3001/api/tasks/".concat(editingTask.id), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: editingTask.name,
                                description: editingTask.description,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    updatedTask_1 = _a.sent();
                    setTasks(tasks.map(function (task) { return (task.id === updatedTask_1.id ? updatedTask_1 : task); }));
                    setEditingTask(null); // Clear editing state
                    return [3 /*break*/, 5];
                case 4:
                    console.error('Failed to edit task');
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.error('Error editing task:', error_2);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    console.error('No task selected for editing');
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var handleTaskEditClick = function (task) {
        setEditingTask({ id: task.id, name: task.name, description: task.description });
    };
    var handleDeleteTask = function (taskId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:3001/api/tasks/".concat(taskId), {
                            method: 'DELETE',
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        setTasks(tasks.filter(function (task) { return task.id !== taskId; }));
                    }
                    else {
                        console.error('Failed to delete task');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error deleting task:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!project) {
        return <div>No project found</div>;
    }
    return (<div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
      <p>{project.description}</p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <div className="mb-4">
          <input type="text" placeholder="Task name" value={newTask.name} onChange={function (e) { return setNewTask(__assign(__assign({}, newTask), { name: e.target.value })); }} className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white"/>
          <input type="text" placeholder="Task description" value={newTask.description} onChange={function (e) { return setNewTask(__assign(__assign({}, newTask), { description: e.target.value })); }} className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white mt-2"/>
          <button onClick={handleAddTask} className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Add Task
          </button>
        </div>

        {editingTask && (<div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Edit Task</h3>
            <input type="text" placeholder="Task name" value={editingTask.name} onChange={function (e) { return setEditingTask(__assign(__assign({}, editingTask), { name: e.target.value })); }} className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white"/>
            <input type="text" placeholder="Task description" value={editingTask.description} onChange={function (e) { return setEditingTask(__assign(__assign({}, editingTask), { description: e.target.value })); }} className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white mt-2"/>
            <button onClick={handleEditTask} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save Changes
            </button>
          </div>)}

        <ul>
          {tasks.map(function (task) { return (<li key={task.id} className="mb-4">
              <h3 className="text-xl font-bold">{task.name}</h3>
              <p>{task.description}</p>
              <button onClick={function () { return handleTaskEditClick(task); }} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit
              </button>
              <button onClick={function () { return handleDeleteTask(task.id); }} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </li>); })}
        </ul>
      </div>
    </div>);
};
exports.default = ProjectDetails;
