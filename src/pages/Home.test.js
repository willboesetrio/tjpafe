import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

test("Home buttons render", async() => {
    render(<Home />, {wrapper: BrowserRouter})
    const homeBtn = screen.getByText(/LEADERBOARD/i);
    expect(homeBtn).toBeInTheDocument();
})