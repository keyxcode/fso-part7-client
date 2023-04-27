import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter } from "react-router-dom";
import { NotiContextProvider } from "./NotiContext";
import { UserContextProvider } from "./UserContext";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotiContextProvider>
          <App />
        </NotiContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </HashRouter>
);
