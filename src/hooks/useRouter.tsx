import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../views/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

export default router;
