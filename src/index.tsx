import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { Theme } from "./theme";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </>
);
