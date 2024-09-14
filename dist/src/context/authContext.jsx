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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = exports.AuthProvider = void 0;
var react_1 = __importStar(require("react"));
var AuthContext = (0, react_1.createContext)(undefined);
var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), isAuthenticated = _b[0], setIsAuthenticated = _b[1];
    var _c = (0, react_1.useState)(undefined), userId = _c[0], setUserId = _c[1];
    var _d = (0, react_1.useState)(undefined), token = _d[0], setToken = _d[1];
    var _e = (0, react_1.useState)(undefined), name = _e[0], setName = _e[1];
    var _f = (0, react_1.useState)(undefined), profilePicture = _f[0], setProfilePicture = _f[1];
    (0, react_1.useEffect)(function () {
        // Verificar e recuperar os dados do localStorage ao iniciar
        var storedToken = localStorage.getItem('token');
        var storedName = localStorage.getItem('name');
        var storedUserId = localStorage.getItem('userId');
        var storedProfilePicture = localStorage.getItem('profilePicture');
        if (storedToken && storedName && storedUserId) {
            setIsAuthenticated(true);
            setToken(storedToken);
            setName(storedName);
            setUserId(storedUserId);
            setProfilePicture(storedProfilePicture || undefined);
        }
    }, []);
    var login = function (token, name, userId, profilePicture) {
        console.log('Login called with:', { token: token, name: name, userId: userId, profilePicture: profilePicture });
        setIsAuthenticated(true);
        setToken(token);
        setName(name);
        setUserId(userId);
        setProfilePicture(profilePicture);
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        localStorage.setItem('userId', userId);
        if (profilePicture) {
            localStorage.setItem('profilePicture', profilePicture);
        }
    };
    var logout = function () {
        console.log('Logging out...');
        setIsAuthenticated(false);
        setToken(undefined);
        setName(undefined);
        setUserId(undefined);
        setProfilePicture(undefined);
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('userId');
        localStorage.removeItem('profilePicture');
    };
    return (<AuthContext.Provider value={{ isAuthenticated: isAuthenticated, userId: userId, token: token, name: name, profilePicture: profilePicture, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>);
};
exports.AuthProvider = AuthProvider;
var useAuth = function () {
    var context = (0, react_1.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
exports.useAuth = useAuth;
