import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/app.scss";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { RouterProvider } from "react-router-dom";
import { ROUTER } from "./pages/router/index.ts";
import { ModalProvider } from "./containers/modalProvider/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <RouterProvider router={ROUTER} />
      </ModalProvider>
    </Provider>
  </React.StrictMode>
);
