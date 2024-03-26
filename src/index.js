import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/User";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.render(
  <AuthProvider>
    <App />
    <Analytics />
  </AuthProvider>,
  document.getElementById("root")
);
