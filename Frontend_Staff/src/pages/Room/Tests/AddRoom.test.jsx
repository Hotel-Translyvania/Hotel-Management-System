import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddRoom from "./AddRoom";
import { useRoomStore } from "@/components/store/useRoomStore";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Edit: () => <svg data-testid="edit-icon" />,
  ArrowUpDown: () => <svg data-testid="arrow-up-down-icon" />,
  Trash2: () => <svg data-testid="trash-icon" />,
  XIcon: () => <svg data-testid="x-icon" />,
}));

// Mock dependencies for cn (used in Dialog and Button)
jest.mock("clsx", () => ({
  clsx: (...args) => args.filter(Boolean).join(" "),
}));
jest.mock("tailwind-merge", () => ({
  twMerge: (className) => className,
}));

describe("AddRoom Component", () => {
  const mockAxios = new MockAdapter(axios);
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
    mockOnSuccess.mockClear();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("renders the form correctly (happy path)", () => {
    render(<AddRoom onSuccess={mockOnSuccess} />);

    expect(screen.getByText("Add New Room")).toBeInTheDocument();
    expect(screen.getByLabelText("Room Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Room Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Bed Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Room Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Size (sq ft)")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Price per Night ($)")).toBeInTheDocument();
    expect(screen.getByLabelText("Max Occupancy")).toBeInTheDocument();
    expect(screen.getByLabelText("Amenities")).toBeInTheDocument();
    expect(screen.getByText("Add Room Image")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Room/i })).toBeInTheDocument();
  });

  it("submits the form successfully with valid data (happy path)", async () => {
    mockAxios
      .onPost("http://localhost:3000/api/v1/hms/hotels/1/rooms")
      .reply(200, { image: "http://localhost:3000/api/v1/images/new-room.jpg" });

    render(<AddRoom onSuccess={mockOnSuccess} />);

    const file = new File(["dummy content"], "room.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText("Add Room Image").querySelector("input[type='file']");
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.change(screen.getByLabelText("Room Number"), { target: { value: "101" } });
    fireEvent.change(screen.getByLabelText("Room Type"), { target: { value: "Deluxe" } });
    fireEvent.change(screen.getByLabelText("Bed Type"), { target: { value: "Queen" } });
    fireEvent.change(screen.getByLabelText("Room Description"), { target: { value: "A luxurious room" } });
    fireEvent.change(screen.getByLabelText("Size (sq ft)"), { target: { value: "400" } });
    fireEvent.change(screen.getByLabelText("Status"), { target: { value: "Available" } });
    fireEvent.change(screen.getByLabelText("Price per Night ($)"), { target: { value: "150" } });
    fireEvent.change(screen.getByLabelText("Max Occupancy"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Amenities"), { target: { value: "Wi-Fi, TV, Mini Bar" } });

    const submitButton = screen.getByRole("button", { name: /Add Room/i });
    expect(submitButton).toHaveClass("bg-blue-600 hover:bg-blue-700"); // From cn in Button
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(useRoomStore.getState().rooms).toContainEqual(
        expect.objectContaining({
          roomNumber: "101",
          type: "Deluxe",
          description: "A luxurious room",
          bedType: "Queen",
          size: "400",
          status: "available",
          price: "150",
          occupancy: "3",
          amenities: ["Wi-Fi", "TV", "Mini Bar"],
          image: "http://localhost:3000/api/v1/images/new-room.jpg",
        })
      );
    });
  });

  it("displays validation errors with empty fields (edge case)", async () => {
    render(<AddRoom onSuccess={mockOnSuccess} />);

    const submitButton = screen.getByRole("button", { name: /Add Room/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("Please upload an image")).toBeInTheDocument();
    expect(screen.getByText("Room number is required")).toBeInTheDocument();
    expect(screen.getByText("Room description is required")).toBeInTheDocument();
    expect(screen.getByText("Size is required")).toBeInTheDocument();
    expect(screen.getByText("Price is required")).toBeInTheDocument();
    expect(screen.getByText("Max occupancy is required")).toBeInTheDocument();
    expect(screen.getByText("Amenities are required")).toBeInTheDocument();
  });

  it("handles very long input strings (edge case)", async () => {
    mockAxios
      .onPost("http://localhost:3000/api/v1/hms/hotels/1/rooms")
      .reply(200, { image: "http://localhost:3000/api/v1/images/long-room.jpg" });

    render(<AddRoom onSuccess={mockOnSuccess} />);

    const longString = "A".repeat(1000);
    const file = new File(["dummy content"], "room.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText("Add Room Image").querySelector("input[type='file']");
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.change(screen.getByLabelText("Room Number"), { target: { value: longString } });
    fireEvent.change(screen.getByLabelText("Room Description"), { target: { value: longString } });
    fireEvent.change(screen.getByLabelText("Size (sq ft)"), { target: { value: "400" } });
    fireEvent.change(screen.getByLabelText("Price per Night ($)"), { target: { value: "150" } });
    fireEvent.change(screen.getByLabelText("Max Occupancy"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Amenities"), { target: { value: longString } });

    const submitButton = screen.getByRole("button", { name: /Add Room/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(useRoomStore.getState().rooms).toContainEqual(
        expect.objectContaining({
          roomNumber: longString,
          description: longString,
          amenities: [longString],
        })
      );
    });
  });

  it("displays error message on API failure (error condition)", async () => {
    mockAxios
      .onPost("http://localhost:3000/api/v1/hms/hotels/1/rooms")
      .reply(500, { message: "Server error" });

    render(<AddRoom onSuccess={mockOnSuccess} />);

    const file = new File(["dummy content"], "room.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText("Add Room Image").querySelector("input[type='file']");
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.change(screen.getByLabelText("Room Number"), { target: { value: "101" } });
    fireEvent.change(screen.getByLabelText("Room Description"), { target: { value: "A cozy room" } });
    fireEvent.change(screen.getByLabelText("Size (sq ft)"), { target: { value: "400" } });
    fireEvent.change(screen.getByLabelText("Price per Night ($)"), { target: { value: "150" } });
    fireEvent.change(screen.getByLabelText("Max Occupancy"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Amenities"), { target: { value: "Wi-Fi, TV" } });

    const submitButton = screen.getByRole("button", { name: /Add Room/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Failed to add room")).toBeInTheDocument();
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });

  it("handles invalid file type for image upload (error condition)", () => {
    render(<AddRoom onSuccess={mockOnSuccess} />);

    const file = new File(["dummy content"], "document.pdf", { type: "application/pdf" });
    const fileInput = screen.getByLabelText("Add Room Image").querySelector("input[type='file']");
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.queryByAltText("document.pdf")).not.toBeInTheDocument();
  });

  it("displays loading spinner during submission", async () => {
    mockAxios
      .onPost("http://localhost:3000/api/v1/hms/hotels/1/rooms")
      .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, { image: "http://localhost:3000/api/v1/images/room.jpg" }]), 1000)));

    render(<AddRoom onSuccess={mockOnSuccess} />);

    const file = new File(["dummy content"], "room.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText("Add Room Image").querySelector("input[type='file']");
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.change(screen.getByLabelText("Room Number"), { target: { value: "101" } });
    fireEvent.change(screen.getByLabelText("Room Description"), { target: { value: "A cozy room" } });
    fireEvent.change(screen.getByLabelText("Size (sq ft)"), { target: { value: "400" } });
    fireEvent.change(screen.getByLabelText("Price per Night ($)"), { target: { value: "150" } });
    fireEvent.change(screen.getByLabelText("Max Occupancy"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Amenities"), { target: { value: "Wi-Fi, TV" } });

    const submitButton = screen.getByRole("button", { name: /Add Room/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("Loading reservations...")).toBeInTheDocument();
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("animate-spin");

    await waitFor(() => {
      expect(screen.queryByText("Loading reservations...")).not.toBeInTheDocument();
    });
  });
});