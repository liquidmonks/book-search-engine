// Import the React library for creating components
import React from "react";
// Import the ReactDOM library for rendering components to the DOM
import ReactDOM from "react-dom/client";
// Import the main App component
import App from "./App";
// Import the BrowserRouter component for handling routing
import { BrowserRouter } from "react-router-dom";
// Import the Bootstrap CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";
// Import custom CSS styles
import "./index.css";

// Create a root DOM node for the React app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the React app within the root DOM node using StrictMode and BrowserRouter
root.render(
  // Use React.StrictMode to enable additional checks and warnings during development
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
