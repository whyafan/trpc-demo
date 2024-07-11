import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import { useState } from "react";

import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";
import AppComponent from "./AppComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // Base URL
          url: "http://localhost:3005/api",
        }),
      ],
    })
  );

  return (
    // tRPC Provider
    <trpc.Provider client={trpcClient} queryClient={client}>
      {/* React Query Provider */}
      <QueryClientProvider client={client}>
        {/* HTML React Component */}
        <AppComponent />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

root.render(<App />);
