import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

test("Login buttons render", async() => {
    render(<Login />, {wrapper: BrowserRouter})
    const loginh = document.querySelector('h5');
    expect(loginh).toBeInTheDocument();
})