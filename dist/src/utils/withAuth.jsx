"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/withAuth.tsx
var react_1 = __importDefault(require("react"));
var router_1 = require("next/router");
var authContext_1 = require("@/context/authContext");
var withAuth = function (WrappedComponent) {
    var AuthWrapper = function (props) {
        var _a = (0, authContext_1.useAuth)(), isAuthenticated = _a.isAuthenticated, userId = _a.userId;
        var router = (0, router_1.useRouter)();
        react_1.default.useEffect(function () {
            // Espera o contexto estar carregado para decidir o redirecionamento
            if (!isAuthenticated && userId === undefined) {
                router.push('/login');
            }
        }, [isAuthenticated, userId, router]);
        if (!isAuthenticated && userId === undefined) {
            return <div>Loading...</div>; // Pode mostrar um spinner ou mensagem de carregamento
        }
        return <WrappedComponent {...props}/>;
    };
    return AuthWrapper;
};
exports.default = withAuth;
