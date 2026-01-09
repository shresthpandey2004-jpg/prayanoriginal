import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Error boundary for production
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  
  // Fallback UI
  rootElement.innerHTML = `
    <div style="text-align: center; padding: 2rem; font-family: system-ui;">
      <h1 style="color: #ea580c;">🌶️ Prayan Royal Spice Emporium</h1>
      <p>Premium Indian Spices & Masalas</p>
      <p>📱 WhatsApp: <a href="https://wa.me/918866658919" style="color: #ea580c;">+91 8866658919</a></p>
      <p>🛒 Order fresh spices directly via WhatsApp</p>
      <div style="margin-top: 2rem;">
        <button onclick="location.reload()" style="background: #ea580c; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    </div>
  `;
}
