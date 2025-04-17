import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HotelListing } from "../path/to/HotelListing";
import "@testing-library/jest-dom";
import axios from "axios";

// Mock axios and child components
jest.mock("axios");
jest.mock("../AddHotel", () => () => <div>AddHotel Mock</div>);  // the correct path to AddHotel component -> ../AddHotel
jest.mock("../EditHotel", () => () => <div>EditHotel Mock</div>);
jest.mock("../Hotels/hotelCard", () => ({ hotel }) => (
  <div>{hotel.hotelName}</div>
));

describe("HotelListing Component", () => {
  const mockHotels = [
    {
      id: 1,
      hotelName: "Test Hotel 1",
      location: "Test City 1",
      description: "Test Description 1",
      image: "test1.jpg",
    },
    {
      id: 2,
      hotelName: "Test Hotel 2",
      location: "Test City 2",
      description: "Test Description 2",
      image: "test2.jpg",
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        data: mockHotels.map((h) => ({
          id: h.id,
          name: h.hotelName,
          location: h.location,
          description: h.description,
          image: h.image,
        })),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Fetches and displays hotels
  it("fetches and displays hotels", async () => {
    render(<HotelListing />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/hotels"
      );
      expect(screen.getByText("Test Hotel 1")).toBeInTheDocument();
      expect(screen.getByText("Test Hotel 2")).toBeInTheDocument();
    });
  });

  // Test 2: Handles search functionality
  it("filters hotels based on search term", async () => {
    render(<HotelListing />);
    await screen.findByText("Test Hotel 1");

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Test Hotel 1" } });

    expect(screen.getByText("Test Hotel 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Hotel 2")).not.toBeInTheDocument();
  });

  // Test 3: Opens Add Hotel dialog
  it("opens Add Hotel dialog when button clicked", async () => {
    render(<HotelListing />);
    await screen.findByText("Test Hotel 1");

    fireEvent.click(screen.getByText("Add Hotel"));
    expect(screen.getByText("AddHotel Mock")).toBeInTheDocument();
  });

  // Test 4: Handles API error
  it("handles API error gracefully", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));
    render(<HotelListing />);

    await waitFor(() => {
      expect(screen.getByText("Loading hotel...")).toBeInTheDocument();
    });
  });

  // Test 5: Paginates results
  it("paginates results correctly", async () => {
    // Create more hotels for pagination test
    const manyHotels = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      hotelName: `Hotel ${i + 1}`,
      location: `City ${i + 1}`,
      description: `Description ${i + 1}`,
      image: `image${i + 1}.jpg`,
    }));

    axios.get.mockResolvedValue({
      data: {
        data: manyHotels.map((h) => ({
          id: h.id,
          name: h.hotelName,
          location: h.location,
          description: h.description,
          image: h.image,
        })),
      },
    });

    render(<HotelListing />);
    await screen.findByText("Hotel 1");

    // Should show pagination controls
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
  });
});
