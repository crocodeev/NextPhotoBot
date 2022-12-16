import css from "./css/custom.css";
import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./dashboard";
const container = document.getElementById("root");
const root = createRoot(container);

console.log("START ADMIN");

root.render(      
<App />
)