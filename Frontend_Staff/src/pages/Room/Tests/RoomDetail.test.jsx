import { render, screen } from "@testing-library/react";
import RoomDetail from "./RoomDetail";

describe("RoomDetail Component", () => {
  const defaultRow = {
    original: {
      roomNumber: "101",
      image: "http://example.com/room.jpg",
      description: "A cozy room with a great view",
      size: 300,
      occupancy: 2,
      amenities: ["Wi-Fi", "TV", "Mini Bar", "Safe"],
    },
  };

  it("renders room details correctly with complete data (happy path)", () => {
    render(<RoomDetail row={defaultRow} />);

    const image = screen.getByAltText("Room 101");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "http://example.com/room.jpg");

    expect(screen.getByText("A cozy room with a great view")).toBeInTheDocument();
    expect(screen.getByText("300 sq-ft")).toBeInTheDocument();
    expect(screen.getByText("Max 2 people")).toBeInTheDocument();
    expect(screen.getByText("Wi-Fi")).toBeInTheDocument();
    expect(screen.getByText("TV")).toBeInTheDocument();
    expect(screen.getByText("Mini Bar")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("renders with minimal data (edge case)", () => {
    const minimalRow = {
      original: {
        roomNumber: "102",
        image: null,
        description: "",
        size: 0,
        occupancy: 1,
        amenities: [],
      },
    };

    render(<RoomDetail row={minimalRow} />);

    const image = screen.getByAltText("Room 102");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "");

    expect(screen.getByText("")).toBeInTheDocument();
    expect(screen.getByText("0 sq-ft")).toBeInTheDocument();
    expect(screen.getByText("Max 1 people")).toBeInTheDocument();
    expect(screen.queryByText(/Wi-Fi|TV|Mini Bar/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });

  it("handles missing or invalid data gracefully (error condition)", () => {
    const invalidRow = {
      original: {
        roomNumber: undefined,
        image: undefined,
        description: undefined,
        size: undefined,
        occupancy: undefined,
        amenities: undefined,
      },
    };

    render(<RoomDetail row={invalidRow} />);

    const image = screen.getByAltText("Room undefined");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "");

    expect(screen.getByText("")).toBeInTheDocument();
    expect(screen.getByText(" sq-ft")).toBeInTheDocument();
    expect(screen.getByText("Max  people")).toBeInTheDocument();
    expect(screen.queryByText(/Wi-Fi|TV|Mini Bar/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });

  it("limits amenities to 3 with a badge for additional ones", () => {
    const rowWithManyAmenities = {
      original: {
        roomNumber: "101",
        image: "http://example.com/room.jpg",
        description: "A cozy room",
        size: 300,
        occupancy: 2,
        amenities: ["Wi-Fi", "TV", "Mini Bar", "Safe", "Coffee Maker"],
      },
    };

    render(<RoomDetail row={rowWithManyAmenities} />);

    expect(screen.getByText("Wi-Fi")).toBeInTheDocument();
    expect(screen.getByText("TV")).toBeInTheDocument();
    expect(screen.getByText("Mini Bar")).toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
    expect(screen.queryByText("Safe")).not.toBeInTheDocument();
    expect(screen.queryByText("Coffee Maker")).not.toBeInTheDocument();
  });
});