import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { BrowserRouter } from "react-router-dom";
import Redirect from "./Redirect";

test("Redirect buttons render", async() => {
    render(<Redirect />, {wrapper: BrowserRouter})
    const homeBtn = screen.getByText(/BACK TO HOMEPAGE/i);
    expect(homeBtn).toBeInTheDocument();
})