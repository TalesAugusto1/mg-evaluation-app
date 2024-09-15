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
var router_1 = require("next/router");
var link_1 = __importDefault(require("next/link"));
var UserProfile = function (_a) {
    var userId = _a.userId;
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(false), editMode = _d[0], setEditMode = _d[1];
    var _e = (0, react_1.useState)(''), name = _e[0], setName = _e[1];
    var _f = (0, react_1.useState)(null), profilePicture = _f[0], setProfilePicture = _f[1];
    var _g = (0, react_1.useState)(''), password = _g[0], setPassword = _g[1];
    var router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(function () {
        var fetchUser = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch("http://localhost:3001/api/users/".concat(userId))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Error fetching user data: ".concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setUser(data);
                        setName(data.name);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching user data:", error_1);
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
    var handleDeleteAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
        var confirmed, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
                    if (!confirmed) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3001/api/users/".concat(userId), {
                            method: 'DELETE',
                        })];
                case 2:
                    response = _a.sent();
                    if (response.ok) {
                        alert("Account deleted successfully.");
                        router.push('/');
                    }
                    else {
                        alert("Failed to delete account. Please try again.");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error deleting account:", error_2);
                    alert("Error deleting account. Please try again.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleUpdateProfile = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, response, updatedUser, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    formData = new FormData();
                    formData.append('name', name);
                    if (profilePicture) {
                        formData.append('profilePicture', profilePicture);
                    }
                    if (password) {
                        formData.append('password', password);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("http://localhost:3001/api/users/".concat(userId), {
                            method: 'PUT',
                            body: formData,
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    alert("Profile updated successfully.");
                    setEditMode(false);
                    return [4 /*yield*/, response.json()];
                case 3:
                    updatedUser = _a.sent();
                    setUser(updatedUser);
                    return [3 /*break*/, 5];
                case 4:
                    alert("Failed to update profile. Please try again.");
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    console.error("Error updating profile:", error_3);
                    alert("Error updating profile. Please try again.");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    if (loading)
        return <p className="text-center text-lg text-gray-400 dark:text-gray-600">Loading...</p>;
    if (!user)
        return <p className="text-center text-lg text-gray-400 dark:text-gray-600">User not found</p>;
    var profilePictureSrc = user.profilePicture
        ? "data:".concat(user.profilePicture.type, ";base64,").concat(Buffer.from(user.profilePicture.data).toString('base64'))
        : '';
    return (<div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex flex-row items-start mb-8 space-x-8">
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32">
              {user.profilePicture ? (<image_1.default src={profilePictureSrc} alt={"".concat(user.name, "'s profile")} width={128} height={128} layout="fixed" className="rounded-full border-4 border-blue-500 dark:border-blue-300 object-cover" aria-labelledby="profile-picture"/>) : (<div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 text-2xl font-bold">
                  No Image
                </div>)}
            </div>
          </div>
          <div className="flex flex-col justify-center flex-grow space-y-4">
            <h1 id="profile-name" className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{user.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{user.id}</p>
          </div>
          <div className="flex flex-col space-y-4">
            {editMode ? (<form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
                  <input id="name" type="text" value={name} onChange={function (e) { return setName(e.target.value); }} className="w-full p-3 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" required aria-required="true"/>
                </div>
                <div>
                  <label htmlFor="profile-picture" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture:</label>
                  <input id="profile-picture" type="file" onChange={function (e) { var _a; return setProfilePicture(((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null); }} className="w-full text-sm text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg" aria-describedby="file-upload-help"/>
                  <p id="file-upload-help" className="text-gray-500 dark:text-gray-400 text-sm">Select a profile picture to upload.</p>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">New Password:</label>
                  <input id="password" type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} className="w-full p-3 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" aria-required="true"/>
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-200 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition">
                  Save Changes
                </button>
                <button type="button" onClick={function () { return setEditMode(false); }} className="w-full px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white dark:text-gray-200 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 transition">
                  Cancel
                </button>
              </form>) : (<div className="flex flex-col items-center space-y-4">
                <button onClick={function () { return setEditMode(true); }} className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white dark:text-gray-200 rounded-lg hover:bg-green-600 dark:hover:bg-green-500 transition">
                  Edit Profile
                </button>
                <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white dark:text-gray-200 rounded-lg hover:bg-red-600 dark:hover:bg-red-500 transition">
                  Delete Account
                </button>
              </div>)}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <link_1.default href="/" className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-200 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition">
          Back to Home
        </link_1.default>
      </div>
    </div>);
};
exports.default = UserProfile;
