import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotiContextProvider } from "./NotiContext";
import { UserContextProvider } from "./UserContext";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotiContextProvider>
        <App />
      </NotiContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
