"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = exports.AuthProvider = void 0;
var react_1 = require("react");
var AuthContext = (0, react_1.createContext)(undefined);
var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), isAuthenticated = _b[0], setIsAuthenticated = _b[1];
    var _c = (0, react_1.useState)(null), user = _c[0], setUser = _c[1];
    (0, react_1.useEffect)(function () {
        var token = localStorage.getItem('token');
        var name = localStorage.getItem('name');
        if (token && name) {
            setIsAuthenticated(true);
            setUser({ name: name });
        }
    }, []);
    var login = function (token, name) {
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        setIsAuthenticated(true);
        setUser({ name: name });
    };
    var logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        setIsAuthenticated(false);
        setUser(null);
    };
    return (<AuthContext.Provider value={{ isAuthenticated: isAuthenticated, user: user, login: login, logout: logout }}>
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
