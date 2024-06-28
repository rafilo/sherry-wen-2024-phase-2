// todo: test installation of app.jsx
import React from "react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "../Pages/HomePage/HomePage.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
// npm test -- app.test.jsx
it('renders the homepage', () => {

  const { getByText,getByRole } = render(
    <GoogleOAuthProvider clientId="490911112367-mr2ff1jjj3m66n7eo4vcg7rjpals41pa.apps.googleusercontent.com">
      <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
    </GoogleOAuthProvider>
  );
  expect(screen.getByText('Github')).toBeInTheDocument();
  expect(screen.getByText('Resources')).toBeInTheDocument();
  
});

