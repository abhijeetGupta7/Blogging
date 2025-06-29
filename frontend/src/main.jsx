import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeConfig } from "flowbite-react";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeConfig dark={false} />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
