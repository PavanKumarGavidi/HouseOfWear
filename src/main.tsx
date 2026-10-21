import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

console.log("React app starting...");

try {
  const root = document.getElementById("root");
  if (!root) {
    console.error("Root element not found!");
  } else {
    console.log("Root element found, rendering app...");
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App rendered successfully!");
  }
} catch (error) {
  console.error("Error rendering app:", error);
  document.getElementById("root")!.innerHTML = `
    <div style="padding: 20px; color: red;">
      <h1>Error loading application</h1>
      <pre>${error instanceof Error ? error.message : String(error)}</pre>
    </div>
  `;
}
