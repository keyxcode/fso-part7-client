import React from "react";
import ReactDOM from "react-dom/client";
import { NotiContextProvider } from "./NotiContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotiContextProvider>
    <App />
  </NotiContextProvider>
);
