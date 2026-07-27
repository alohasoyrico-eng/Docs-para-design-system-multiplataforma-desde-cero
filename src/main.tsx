import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@flowds/design-system/styles";
import { FlowToastProvider } from "@flowds/design-system";
import { App } from "./App";
import "./docs.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlowToastProvider>
      <App />
    </FlowToastProvider>
  </StrictMode>,
);
