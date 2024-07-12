import React from "react";
import Homepage from "../src/pages/HomePage/HomePage";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import ErrorPage from "../src/ErrorPage";
import CraftPageContainer from "../src/pages/CraftPage/CraftPageContainer";
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
    element: <CraftPageContainer />,
  },
]);

export default function App() {
  return (
    <GoogleOAuthProvider clientId="27086826403-fgtcr1tmjnla8gimk2c8kt7hfetmp1km.apps.googleusercontent.com">
      <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
}
