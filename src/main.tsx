import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient();

defineCustomElements(window);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
