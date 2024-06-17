import React from "react";
import ReactDOM from "react-dom/client";
import { Homepage } from "./components/homePage/HomePage.js";
import { Provider } from "react-redux";
import {store} from "./store/store";
import ErrorPage from "./ErrorPage.js";
import App from "./App.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/craftpage",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="27086826403-fgtcr1tmjnla8gimk2c8kt7hfetmp1km.apps.googleusercontent.com">
    <React.StrictMode>
      
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
