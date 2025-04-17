import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CurrentBooking from "../CurrentBooking";

describe("CurrentBooking Component", () => {
  it("renders message when no booking is provided", () => {
    render(<CurrentBooking />);
    expect(
      screen.getByText("You don't have any active bookings.")
    ).toBeInTheDocument();
  });

  it("renders booking details when booking is provided", () => {
    const booking = {
      status: "Confirmed",
      roomNum: "101",
      roomType: "Deluxe",
      checkIn: "2025-04-15T00:00:00.000Z",
      checkOut: "2025-04-20T00:00:00.000Z",
    };

    render(<CurrentBooking booking={booking} />);

    expect(screen.getByText("Current Booking")).toBeInTheDocument();
    expect(screen.getByText("Room Number")).toBeInTheDocument();
    expect(screen.getByText("101")).toBeInTheDocument();
    expect(screen.getByText("Room Type")).toBeInTheDocument();
    expect(screen.getByText("Deluxe")).toBeInTheDocument();
    expect(screen.getByText("Check-in Date")).toBeInTheDocument();
    expect(screen.getByText("4/15/2025")).toBeInTheDocument();
    expect(screen.getByText("Check-out Date")).toBeInTheDocument();
    expect(screen.getByText("4/20/2025")).toBeInTheDocument();
  });

  it("renders the correct status color", () => {
    const booking = {
      status: "Completed",
      roomNum: "101",
      roomType: "Deluxe",
      checkIn: "2025-04-15T00:00:00.000Z",
      checkOut: "2025-04-20T00:00:00.000Z",
    };

    render(<CurrentBooking booking={booking} />);

    const statusElement = screen.getByText("Completed");
    expect(statusElement).toHaveClass("bg-blue-100 text-blue-800");
  });
});
