import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import { Provider } from "react-redux";
import { store } from "./Components/App/store";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento #root");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);