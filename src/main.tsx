import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/index.ts";
import router from "./hooks/useRouter.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
