import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RoomList from "../RoomList";

describe("RoomList Component", () => {
  const mockRooms = [
    {
      roomId: "1",
      roomNum: 101,
      roomType: "Deluxe",
      bedType: "Queen",
      floor: 1,
      view: "Sea",
      smoking: false,
    },
    {
      roomId: "2",
      roomNum: 202,
      roomType: "Standard",
      bedType: "Twin",
      floor: 2,
      view: "Garden",
      smoking: true,
    },
  ];

  const mockOnBookNow = jest.fn();

  it("renders loading message when rooms are not provided", () => {
    render(<RoomList rooms={[]} onBookNow={mockOnBookNow} />);
    expect(screen.getByText("Loading rooms...")).toBeInTheDocument();
  });

  it("renders room cards when rooms are provided", () => {
    render(<RoomList rooms={mockRooms} onBookNow={mockOnBookNow} />);

    expect(screen.getByText("Available Rooms")).toBeInTheDocument();
    expect(screen.getAllByText("Deluxe")[0]).toBeInTheDocument(); // Use getAllByText to handle multiple elements
    expect(screen.getAllByText("Standard")[0]).toBeInTheDocument(); // Adjusted to use getAllByText
  });

  it("renders no rooms message when filters exclude all rooms", () => {
    render(<RoomList rooms={mockRooms} onBookNow={mockOnBookNow} />);

    const filterInput = screen.getByPlaceholderText("Room #"); // Adjusted placeholder text
    fireEvent.change(filterInput, { target: { value: "999" } });

    expect(
      screen.getByText("No rooms match your filters.")
    ).toBeInTheDocument();
  });

  it("calls onBookNow when a room card button is clicked", () => {
    const availableRoom = { ...mockRooms[0], roomStatus: "Available" };
    render(<RoomList rooms={[availableRoom]} onBookNow={mockOnBookNow} />);

    const bookNowButton = screen.getByRole("button", { name: /book now/i });
    fireEvent.click(bookNowButton);

    expect(mockOnBookNow).toHaveBeenCalledWith(availableRoom);
  });
});
