"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var authContext_1 = require("../context/authContext");
var link_1 = __importDefault(require("next/link"));
var Home = function () {
    var _a = (0, authContext_1.useAuth)(), isAuthenticated = _a.isAuthenticated, logout = _a.logout;
    return (<div>
      <h1>Home Page</h1>
      {!isAuthenticated ? (<div>
          <link_1.default href="/auth/login">
            <button>Login</button>
          </link_1.default>
          <link_1.default href="/auth/sign-up">
            <button>Sign Up</button>
          </link_1.default>
        </div>) : (<div>
          <p>Bem-vindo à página inicial!</p>
          <button onClick={logout}>Logout</button>
        </div>)}
    </div>);
};
exports.default = Home;
