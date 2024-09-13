"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authContext_1 = require("../context/authContext");
function MyApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (<authContext_1.AuthProvider>
      <Component {...pageProps}/>
    </authContext_1.AuthProvider>);
}
exports.default = MyApp;
