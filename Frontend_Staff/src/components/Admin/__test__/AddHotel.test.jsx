import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddHotel from "../AddHotel";
import "@testing-library/jest-dom";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("AddHotel Component", () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Renders all form fields
  it("renders all form fields correctly", () => {
    render(<AddHotel onSuccess={mockOnSuccess} />);

    expect(screen.getByText("Add Hotel")).toBeInTheDocument();
    expect(screen.getByLabelText("Hotel Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Location")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  // Test 2: Shows validation errors
  it("shows validation errors when fields are empty", async () => {
    render(<AddHotel onSuccess={mockOnSuccess} />);
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("Hotel Name is required")).toBeInTheDocument();
      expect(screen.getByText("Location is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
    });
  });

  // Test 3: Handles image upload
  it("handles image upload", async () => {
    render(<AddHotel onSuccess={mockOnSuccess} />);
    const file = new File(["test"], "test.png", { type: "image/png" });
    const input = screen.getByTestId("fileInput");

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText("Hotel")).toBeInTheDocument();
    });
  });

  // Test 4: Submits form data
  it("submits form data correctly", async () => {
    render(<AddHotel onSuccess={mockOnSuccess} />);
    const file = new File(["test"], "test.png", { type: "image/png" });

    // Fill out form
    fireEvent.change(screen.getByLabelText("Hotel Name"), {
      target: { value: "Test Hotel" },
    });
    fireEvent.change(screen.getByLabelText("Location"), {
      target: { value: "Test City" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByTestId("fileInput"), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/hotels",
        expect.any(FormData),
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  // Test 5: Shows error on submission failure
  it("shows error when submission fails", async () => {
    axios.post.mockRejectedValue(new Error("Network Error"));
    render(<AddHotel onSuccess={mockOnSuccess} />);

    // Fill out form
    fireEvent.change(screen.getByLabelText("Hotel Name"), {
      target: { value: "Test Hotel" },
    });
    fireEvent.change(screen.getByLabelText("Location"), {
      target: { value: "Test City" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("Failed to add hotel")).toBeInTheDocument();
    });
  });
});
