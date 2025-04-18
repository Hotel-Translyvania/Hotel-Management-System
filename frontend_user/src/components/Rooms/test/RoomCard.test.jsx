import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RoomCard from "../RoomCard";

describe("RoomCard Component", () => {
  const mockRoom = {
    roomType: "Deluxe",
    roomNum: "101",
    numberOfBed: 2,
    bedType: "Queen",
    max_occupancy: 4,
    room_descripiton: "A luxurious room with all amenities.",
    pricePerNight: 150,
    roomStatus: "Available",
    image: "https://via.placeholder.com/300x200",
  };

  const mockOnBookNow = jest.fn();

  it("renders room details correctly", () => {
    render(<RoomCard room={mockRoom} onBookNow={mockOnBookNow} />);

    expect(screen.getByText("Deluxe")).toBeInTheDocument();
    expect(screen.getByText("Room #101")).toBeInTheDocument();
    expect(screen.getByText("Bed: 2 Queen")).toBeInTheDocument();
    expect(screen.getByText("Max Occupancy: 4")).toBeInTheDocument();
    expect(
      screen.getByText("A luxurious room with all amenities.")
    ).toBeInTheDocument();
    expect(screen.getByText("$150/night")).toBeInTheDocument();
    expect(screen.getByText("Book Now")).toBeInTheDocument();
  });

  it("disables the button when room is not available", () => {
    const unavailableRoom = { ...mockRoom, roomStatus: "Occupied" };
    render(<RoomCard room={unavailableRoom} onBookNow={mockOnBookNow} />);

    const button = screen.getByText("Unavailable");
    expect(button).toBeDisabled();
  });

  it("calls onBookNow when the button is clicked", () => {
    render(<RoomCard room={mockRoom} onBookNow={mockOnBookNow} />);

    const button = screen.getByText("Book Now");
    fireEvent.click(button);

    expect(mockOnBookNow).toHaveBeenCalledWith(mockRoom);
  });

  it("renders the correct status color", () => {
    render(<RoomCard room={mockRoom} onBookNow={mockOnBookNow} />);

    const statusElement = screen.getByText("Available");
    expect(statusElement).toHaveClass("bg-green-100 text-green-800");
  });

  it("handles undefined roomStatus gracefully", () => {
    const undefinedStatusRoom = { ...mockRoom, roomStatus: undefined };
    render(<RoomCard room={undefinedStatusRoom} onBookNow={mockOnBookNow} />);

    expect(screen.getByText("Unknown")).toBeInTheDocument();
    const button = screen.getByText("Unavailable");
    expect(button).toBeDisabled();
  });
});
