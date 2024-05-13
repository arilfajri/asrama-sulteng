import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store, { persiststore } from "./config/redux/store";
import { Provider } from "react-redux";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persiststore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
