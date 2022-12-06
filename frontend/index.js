
import css from "./css/custom.css";
import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from "./main";
const container = document.getElementById("root");
const root = createRoot(container);
window.Telegram.WebApp.expand();

root.render(
<Provider store={store}>       
<App />
</Provider>
);