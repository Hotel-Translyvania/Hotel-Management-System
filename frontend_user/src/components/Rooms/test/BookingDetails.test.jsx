import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingDetails from "../BookingDetails";

describe("BookingDetails Component", () => {
  it("renders the booking details correctly", () => {
    render(<BookingDetails />);

    expect(screen.getByText("Booking Details")).toBeInTheDocument();
    expect(
      screen.getByText("Here are your booking details.")
    ).toBeInTheDocument();
    expect(screen.getByText("Deluxe Suite")).toBeInTheDocument();
    expect(screen.getByText("March 20, 2025")).toBeInTheDocument();
    expect(screen.getByText("March 25, 2025")).toBeInTheDocument();
    expect(screen.getByText("2 Adults")).toBeInTheDocument();
  });

  it("renders the confirm booking button", () => {
    render(<BookingDetails />);

    const button = screen.getByRole("button", { name: "Confirm Booking" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-600");
  });

  it("handles button click", () => {
    const mockOnClick = jest.fn();
    render(<BookingDetails />);

    const button = screen.getByRole("button", { name: "Confirm Booking" });
    fireEvent.click(button);

    // Assuming the button click triggers some action, you can test it here.
    // For now, we just ensure the button is clickable.
    expect(button).toBeEnabled();
  });
});
