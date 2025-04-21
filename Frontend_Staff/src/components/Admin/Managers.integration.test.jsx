import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Managers from "./Managers"; // adjust path as needed

jest.mock("axios");

describe("Managers Component Integration Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and displays managers data", async () => {
    const mockManagers = [
      {
        _id: "1",
        fullName: "John Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        hotelName: "Hotel Sunshine",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockManagers });

    render(<Managers />);

    // Use findByText which automatically waits
    const name = await screen.findByText("John Doe");
    expect(name).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("handles API error when fetching managers", async () => {
    axios.get.mockRejectedValueOnce(new Error("API failure"));

    render(<Managers />);

    // ✅ Update to match your actual error UI text if any.
    const errorMessage = await screen.findByText((content) =>
      /error|failed|something went wrong/i.test(content)
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
