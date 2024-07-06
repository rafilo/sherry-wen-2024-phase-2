// todo: test installation of app.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "../App";
// npm test -- app.test.jsx
describe("homepage test", () => {
  it("check resource route", () => {
    render(<App />);
    expect(screen.getByText(/Resources/i)).toBeDefined()
  });
});
