import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingHistory from "../BookingHistory.jsx";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("BookingHistory Component", () => {
  const mockBookings = [
    {
      bookingId: "1",
      roomNum: "101",
      checkIn: "2025-04-10",
      checkOut: "2025-04-15",
      status: "Confirmed",
    },
    {
      bookingId: "2",
      roomNum: "102",
      checkIn: "2025-03-01",
      checkOut: "2025-03-05",
      status: "Cancelled",
    },
  ];

  it("renders the booking history table with data", () => {
    render(
      <MemoryRouter>
        <BookingHistory bookings={mockBookings} />
      </MemoryRouter>
    );

    expect(screen.getByText("Booking History")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("#2")).toBeInTheDocument();
    expect(screen.getByText("101")).toBeInTheDocument();
    expect(screen.getByText("102")).toBeInTheDocument();
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });

  it("navigates to booking details on row click", () => {
    render(
      <MemoryRouter>
        <BookingHistory bookings={mockBookings} />
      </MemoryRouter>
    );

    const firstRow = screen.getByText("#1");
    fireEvent.click(firstRow);

    expect(mockNavigate).toHaveBeenCalledWith("/booking/1");
  });

  it("applies correct status colors", () => {
    render(
      <MemoryRouter>
        <BookingHistory bookings={mockBookings} />
      </MemoryRouter>
    );

    const confirmedStatus = screen.getByText("Confirmed");
    const cancelledStatus = screen.getByText("Cancelled");

    expect(confirmedStatus).toHaveClass("bg-green-100 text-green-800");
    expect(cancelledStatus).toHaveClass("bg-red-100 text-red-800");
  });
});
