import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import LeaderBoard from "./LeaderBoard";
import {expect, jest, test} from '@jest/globals';




test("Leaderboard",async () => {
    const testData = [
        {
            "id": 1,
            "loginId": "wboese101",
            "firstName": "Will",
            "lastName": "Boese",
            "email": "wboese101@gmail.com",
            "phone": null,
            "address1": "101 Somewhere St",
            "address2": null,
            "city": "Charlotte",
            "st": "NC",
            "zip": "28203",
            "is18": true,
            "points": 8,
            "lastLoginTimestamp": "2023-01-01T06:01:01Z",
            "account_type_id": "V"
        }
    ];


    jest.spyOn(global, "fetch").mockImplementation(() => 
        Promise.resolve({
            json: () => testData
        })
    );


    await act(async () => {
        render(<LeaderBoard />)
    })


    expect(document.querySelector('h3')).toBeInTheDocument();


    global.fetch.mockRestore();
})