import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Agencies from "./Agencies";



test("Get All Agencies",async () => {
    const testData = [
        {
            "id": 4,
            "name": "LAMB Foundation of NC",
            "ein": "12-3217633",
            "address1": "6420 Rea rd",
            "address2": "Suite A",
            "city": "Charlotte",
            "st": "NC",
            "zip": "28277",
            "events": []
        }
    ];


    jest.spyOn(global, "fetch").mockImplementation(() => 
        Promise.resolve({
            json: () => testData
        })
    );


    await act(async () => {
        render(<Agencies />)
    })


    expect(document.querySelector('h3')).toBeInTheDocument();


    global.fetch.mockRestore();
})