import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Navbar from "./Navbar";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { BrowserRouter } from "react-router-dom";

test("Navbar buttons render", async() => {
    render(<Navbar />, {wrapper: BrowserRouter})
    const homeBtn = screen.getByText(/HOME/i);
    expect(homeBtn).toBeInTheDocument();
})