import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

console.log("=== House Of Wear App Starting ===");

try {
  const root = document.getElementById("root");
  if (!root) {
    console.error("❌ Root element not found!");
    document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: sans-serif;"><h1>Error: Root element not found</h1></div>';
  } else {
    console.log("✅ Root element found, rendering app...");
    
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log("✅ App rendered successfully!");
  }
} catch (error) {
  console.error("❌ Error rendering app:", error);
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; color: red; font-family: monospace; background: #fff; min-height: 100vh;">
        <h1>Error loading application</h1>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto;">${error instanceof Error ? error.stack : String(error)}</pre>
      </div>
    `;
  }
}
