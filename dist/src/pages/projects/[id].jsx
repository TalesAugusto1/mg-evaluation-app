"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var router_1 = require("next/router");
var ai_1 = require("react-icons/ai");
var link_1 = __importDefault(require("next/link"));
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
var ProjectDetails = function () {
    var router = (0, router_1.useRouter)();
    var id = router.query.id;
    var _a = (0, react_1.useState)(null), project = _a[0], setProject = _a[1];
    var _b = (0, react_1.useState)([]), tasks = _b[0], setTasks = _b[1];
    var _c = (0, react_1.useState)({
        name: '',
        description: '',
        status: 'todo',
        dueDate: '',
        assignedUserId: ''
    }), newTask = _c[0], setNewTask = _c[1];
    var _d = (0, react_1.useState)(null), editingTask = _d[0], setEditingTask = _d[1];
    var _e = (0, react_1.useState)(null), editingProject = _e[0], setEditingProject = _e[1];
    var _f = (0, react_1.useState)(true), loading = _f[0], setLoading = _f[1];
    var _g = (0, react_1.useState)(null), error = _g[0], setError = _g[1];
    var _h = (0, react_1.useState)([]), users = _h[0], setUsers = _h[1];
    var _j = (0, react_1.useState)(false), showNewTaskForm = _j[0], setShowNewTaskForm = _j[1];
    var _k = (0, react_1.useState)(false), showEditTaskForm = _k[0], setShowEditTaskForm = _k[1];
    (0, react_1.useEffect)(function () {
        if (id) {
            setLoading(true);
            setError(null);
            // Fetch project details
            fetch("http://localhost:3001/api/projects/".concat(id))
                .then(function (response) { return response.json(); })
                .then(function (data) { return setProject(data); })
                .catch(function (err) { return setError('Failed to fetch project details: ' + err); })
                .finally(function () { return setLoading(false); });
            // Fetch tasks for the project
            fetch("http://localhost:3001/api/projects/".concat(id, "/tasks"))
                .then(function (response) { return response.json(); })
                .then(function (data) { return setTasks(data); })
                .catch(function (err) { return setError('Failed to fetch tasks: ' + err); });
            // Fetch users for task assignment
            fetch('http://localhost:3001/api/users')
                .then(function (response) { return response.json(); })
                .then(function (data) { return setUsers(data); })
                .catch(function (err) { return setError('Failed to fetch users: ' + err); });
        }
    }, [id]);
    var _l = (0, react_1.useState)(false), isKanbanView = _l[0], setIsKanbanView = _l[1];
    var handleAddTask = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, addedTask, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(id && newTask.name && newTask.description && newTask.status && newTask.dueDate)) return [3 /*break*/, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("http://localhost:3001/api/projects/".concat(id, "/tasks"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(__assign(__assign({}, newTask), { projectId: id, assignedUserId: newTask.assignedUserId })),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    addedTask = _a.sent();
                    setTasks(__spreadArray(__spreadArray([], tasks, true), [addedTask], false));
                    setNewTask({ name: '', description: '', status: 'todo', dueDate: '', assignedUserId: '' });
                    setShowNewTaskForm(false);
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
        var response, updatedTask_1, errorData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editingTask) return [3 /*break*/, 9];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fetch("http://localhost:3001/api/tasks/".concat(editingTask.id), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: editingTask.name,
                                description: editingTask.description,
                                status: editingTask.status,
                                dueDate: editingTask.dueDate,
                                assignedUserId: editingTask.assignedUserId,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    updatedTask_1 = _a.sent();
                    setTasks(tasks.map(function (task) { return (task.id === updatedTask_1.id ? updatedTask_1 : task); }));
                    setEditingTask(null);
                    setShowEditTaskForm(false); // Hide the form after editing the task
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    errorData = _a.sent();
                    console.error('Failed to edit task:', errorData.error);
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    console.error('Error editing task:', error_2);
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 10];
                case 9:
                    console.error('No task selected for editing');
                    _a.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    }); };
    var handleEditProject = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, updatedProject, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editingProject) return [3 /*break*/, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("http://localhost:3001/api/projects/".concat(id), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(editingProject),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    updatedProject = _a.sent();
                    setProject(updatedProject);
                    setEditingProject(null);
                    return [3 /*break*/, 5];
                case 4:
                    console.error('Failed to edit project');
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    console.error('Error editing project:', error_3);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    console.error('No project selected for editing');
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var handleTaskEditClick = function (task) {
        setEditingTask({
            id: task.id,
            name: task.name,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
            assignedUserId: task.assignedUserId
        });
        setShowEditTaskForm(true);
    };
    var handleDeleteTask = function (taskId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_4;
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
                    error_4 = _a.sent();
                    console.error('Error deleting task:', error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }
    if (!project) {
        return <div className="text-center text-white">No project found</div>;
    }
    return (<div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <link_1.default href="/" passHref>
        <button className="fixed top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Voltar para Home
        </button>
      </link_1.default>
      <div className="w-full max-w-4xl p-6 mt-6">
        <div className="relative bg-gray-800 bg-opacity-75 p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">
            {editingProject ? (<input type="text" value={editingProject.name} onChange={function (e) { return setEditingProject(__assign(__assign({}, editingProject), { name: e.target.value })); }} className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white"/>) : (project.name)}
          </h1>
          <button onClick={function () { return setEditingProject(editingProject ? null : { name: project.name, description: project.description }); }} className="absolute top-4 right-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            <ai_1.AiOutlineEdit size={24}/>
          </button>
          <p>
            {editingProject ? (<textarea value={editingProject.description} onChange={function (e) { return setEditingProject(__assign(__assign({}, editingProject), { description: e.target.value })); }} className="w-full px-4 py-2 border rounded focus:outline-none bg-gray-700 text-white"/>) : (project.description)}
          </p>

          {editingProject && (<button onClick={handleEditProject} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save Changes
            </button>)}
        </div>

        <div className="relative mt-8">
          <div><h2 className="text-2xl font-bold mb-4">Tasks </h2><button onClick={function () { return setIsKanbanView(!isKanbanView); }} className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
  {isKanbanView ? 'Switch to Table View' : 'Switch to Kanban View'}
    </button>
    </div>

          {!showNewTaskForm && (<button onClick={function () { return setShowNewTaskForm(!showNewTaskForm); }} className="fixed bottom-8 right-8 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-transform">
              <ai_1.AiOutlinePlus size={24}/>
            </button>)}



          {showNewTaskForm && (<div className="absolute top-0 left-0 right-0 p-6 bg-gray-800 rounded-lg shadow-lg z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Add New Task</h3>
                <button onClick={function () { return setShowNewTaskForm(false); }} className="text-gray-400 hover:text-gray-300">
                  <ai_1.AiOutlineClose size={24}/>
                </button>
              </div>
              <input type="text" placeholder="Task name" value={newTask.name} onChange={function (e) { return setNewTask(__assign(__assign({}, newTask), { name: e.target.value })); }} className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"/>
              <textarea placeholder="Task description" value={newTask.description} onChange={function (e) { return setNewTask(__assign(__assign({}, newTask), { description: e.target.value })); }} className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"/>
              <input type="date" placeholder="Due date" value={newTask.dueDate} onChange={function (e) { return setNewTask(__assign(__assign({}, newTask), { dueDate: e.target.value })); }} className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white"/>
              <select value={newTask.status} onChange={function (e) { return setNewTask(__assign(__assign({}, newTask), { status: e.target.value })); }} className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white">
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
              <select value={newTask.assignedUserId} onChange={function (e) { return setNewTask(__assign(__assign({}, newTask), { assignedUserId: e.target.value })); }} className="w-full px-4 py-2 border rounded mb-2 bg-gray-700 text-white">
                <option value="">Assign to...</option>
                {users.map(function (user) { return (<option key={user.id} value={user.id}>{user.name}</option>); })}
              </select>
              <button onClick={handleAddTask} className="apx-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Task
              </button>
            </div>)}

        {isKanbanView ? (<div className="flex flex-wrap gap-4">
    {['todo', 'in-progress', 'review', 'done'].map(function (status) { return (<div key={status} className="flex-1 min-w-[280px] bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 capitalize">{status}</h3>
        {tasks.filter(function (task) { return task.status === status; }).map(function (task) {
                    var _a;
                    return (<div key={task.id} className="bg-gray-700 p-4 mb-4 rounded-lg">
            <h4 className="text-lg font-semibold">{task.name}</h4>
            <p>{task.description}</p>
            <p className="text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</p>

            <p className="text-gray-400">Assigned: {((_a = users.find(function (user) { return user.id === task.assignedUserId; })) === null || _a === void 0 ? void 0 : _a.name) || 'Unassigned'}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={function () { return handleTaskEditClick(task); }} className="text-yellow-500 hover:text-yellow-600">
                <ai_1.AiOutlineEdit size={20}/>
              </button>
              <button onClick={function () { return handleDeleteTask(task.id); }} className="text-red-500 hover:text-red-600">
                <ai_1.AiOutlineDelete size={20}/>
              </button>
            </div>
          </div>);
                })}
      </div>); })}
  </div>) : (<div className="overflow-x-auto bg-gray-800 rounded-lg mt-6">
    <table className="w-full bg-gray-800 text-white">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Description</th>
          <th className="px-4 py-2 border">Due Date</th>
          <th className="px-4 py-2 border">Status</th>
          <th className="px-4 py-2 border">Assigned User</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(function (task) {
                var _a;
                return (<tr key={task.id}>
            <td className="px-4 py-2 border">{task.name}</td>
            <td className="px-4 py-2 border">{task.description}</td>
            <td className="px-4 py-2 border">{new Date(task.dueDate).toLocaleDateString()}</td>

            <td className="px-4 py-2 border">{task.status}</td>
            <td className="px-4 py-2 border">
              {((_a = users.find(function (user) { return user.id === task.assignedUserId; })) === null || _a === void 0 ? void 0 : _a.name) || 'Unassigned'}
            </td>
            <td className="px-4 py-2 border flex space-x-4">
              <button onClick={function () { return handleTaskEditClick(task); }} className="text-yellow-500 hover:text-yellow-600">
                <ai_1.AiOutlineEdit size={20}/>
              </button>
              <button onClick={function () { return handleDeleteTask(task.id); }} className="text-red-500 hover:text-red-600">
                <ai_1.AiOutlineDelete size={20}/>
              </button>
            </td>
          </tr>);
            })}
      </tbody>
    </table>
  </div>)}


          {showEditTaskForm && editingTask && (<div className="absolute top-0 left-0 right-0 mt-8 p-6 bg-gray-800 rounded-lg z-10">
              <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
              <input type="text" value={editingTask.name} onChange={function (e) { return setEditingTask(__assign(__assign({}, editingTask), { name: e.target.value })); }} className="w-full px-4 py-2 border rounded mb-4 bg-gray-700 text-white"/>
              <textarea value={editingTask.description} onChange={function (e) { return setEditingTask(__assign(__assign({}, editingTask), { description: e.target.value })); }} className="w-full px-4 py-2 border rounded mb-4 bg-gray-700 text-white"/>
              <input type="date" value={editingTask.dueDate} onChange={function (e) { return setEditingTask(__assign(__assign({}, editingTask), { dueDate: e.target.value })); }} className="w-full px-4 py-2 border rounded mb-4 bg-gray-700 text-white"/>
              <select value={editingTask.status} onChange={function (e) { return setEditingTask(__assign(__assign({}, editingTask), { status: e.target.value })); }} className="w-full px-4 py-2 border rounded mb-4 bg-gray-700 text-white">
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
              <select value={editingTask.assignedUserId} onChange={function (e) { return setEditingTask(__assign(__assign({}, editingTask), { assignedUserId: e.target.value })); }} className="w-full px-4 py-2 border rounded mb-4 bg-gray-700 text-white">
                <option value="">Assign to...</option>
                {users.map(function (user) { return (<option key={user.id} value={user.id}>{user.name}</option>); })}
              </select>
              <button onClick={handleEditTask} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save Changes
              </button>
            </div>)}
        </div>
      </div>
    </div>);
};
exports.default = ProjectDetails;
