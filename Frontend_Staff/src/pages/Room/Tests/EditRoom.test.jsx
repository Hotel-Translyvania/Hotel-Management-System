import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditRoom from "./EditRoom";
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

// Mock dependencies for cn
jest.mock("clsx", () => ({
  clsx: (...args) => args.filter(Boolean).join(" "),
}));
jest.mock("tailwind-merge", () => ({
  twMerge: (className) => className,
}));

describe("EditRoom Component", () => {
  const mockAxios = new MockAdapter(axios);
  const mockOnSuccess = jest.fn();
  const roomData = {
    id: "1",
    roomNumber: "101",
    type: "Standard",
    description: "A cozy room",
    bedType: "Single",
    size: 300,
    status: "Available",
    image: "http://example.com/room.jpg",
    price: 100,
    occupancy: 2,
    amenities: ["Wi-Fi", "TV"],
  };

  beforeEach(() => {
    mockAxios.reset();
    mockOnSuccess.mockClear();
    useRoomStore.setState({
      rooms: [roomData],
      isLoading: false,
      error: null,
      initialized: true,
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("renders the form with pre-filled data (happy path)", () => {
    render(<EditRoom onSuccess={mockOnSuccess} roomData={roomData} />);

    expect(screen.getByText("Edit Room")).toBeInTheDocument();
    expect(screen.getByLabelText("Room Number")).toHaveValue("101");
    expect(screen.getByLabelText("Room Type")).toHaveValue("Standard");
    expect(screen.getByLabelText("Bed Type")).toHaveValue("Single");
    expect(screen.getByLabelText("Room Description")).toHaveValue("A cozy room");
    expect(screen.getByLabelText("Size (sq ft)")).toHaveValue("300");
    expect(screen.getByLabelText("Status")).toHaveValue("Available");
    expect(screen.getByLabelText("Price per Night ($)")).toHaveValue("100");
    expect(screen.getByLabelText("Max Occupancy")).toHaveValue("2");
    expect(screen.getByLabelText("Amenities")).toHaveValue("Wi-Fi, TV");
    expect(screen.getByAltText("Room")).toHaveAttribute("src", "http://example.com/room.jpg");
  });

  it("submits the form successfully with updated data (happy path)", async () => {
    mockAxios
      .onPatch("http://localhost:3000/api/v1/hms/hotels/1/rooms/1")
      .reply(200, {});

    render(<EditRoom onSuccess={mockOnSuccess} roomData={roomData} />);

    fireEvent.change(screen.getByLabelText("Room Number"), { target: { value: "102" } });
    fireEvent.change(screen.getByLabelText("Room Description"), { target: { value: "Updated room" } });

    const submitButton = screen.getByRole("button", { name: /Update Room/i });
    expect(submitButton).toHaveClass("bg-blue-600 hover:bg-blue-700");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(useRoomStore.getState().rooms).toContainEqual(
        expect.objectContaining({
          roomNumber: "102",
          description: "Updated room",
        })
      );
    });
  });

  it("displays validation errors with empty fields (edge case)", async () => {
    render(<EditRoom onSuccess={mockOnSuccess} roomData={roomData} />);

    fireEvent.change(screen.getByLabelText("Room Number"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Room Description"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Size (sq ft)"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Price per Night ($)"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Max Occupancy"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Amenities"), { target: { value: "" } });

    const submitButton = screen.getByRole("button", { name: /Update Room/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("Room number is required")).toBeInTheDocument();
    expect(screen.getByText("Room description is required")).toBeInTheDocument();
    expect(screen.getByText("Size is required")).toBeInTheDocument();
    expect(screen.getByText("Price is required")).toBeInTheDocument();
    expect(screen.getByText("Max occupancy is required")).toBeInTheDocument();
    expect(screen.getByText("Amenities are required")).toBeInTheDocument();
  });

  it("handles very long input strings (edge case)", async () => {
    mockAxios
      .onPatch("http://localhost:3000/api/v1/hms/hotels/1/rooms/1")
      .reply(200, {});

    render(<EditRoom onSuccess={mockOnSuccess} roomData={roomData} />);

    const longString = "B".repeat(1000);
    fireEvent.change(screen.getByLabelText("Room Number"), { target: { value: longString } });
    fireEvent.change(screen.getByLabelText("Room Description"), { target: { value: longString } });
    fireEvent.change(screen.getByLabelText("Amenities"), { target: { value: longString } });

    const submitButton = screen.getByRole("button", { name: /Update Room/i });
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
      .onPatch("http://localhost:3000/api/v1/hms/hotels/1/rooms/1")
      .reply(500, { message: "Server error" });

    render(<EditRoom onSuccess={mockOnSuccess} roomData={roomData} />);

    const submitButton = screen.getByRole("button", { name: /Update Room/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Failed to update room. Please try again.")).toBeInTheDocument();
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });

  it("handles invalid file type for image upload (error condition)", () => {
    render(<EditRoom onSuccess={mockOnSuccess} roomData={roomData} />);

    const file = new File(["dummy content"], "document.pdf", { type: "application/pdf" });
    const fileInput = screen.getByLabelText("Change Room Image").querySelector("input[type='file']");
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.queryByAltText("document.pdf")).not.toBeInTheDocument();
    expect(screen.getByAltText("Room")).toHaveAttribute("src", "http://example.com/room.jpg");
  });

  it("displays loading spinner during submission", async () => {
    mockAxios
      .onPatch("http://localhost:3000/api/v1/hms/hotels/1/rooms/1")
      .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, {}]), 1000)));

    render(<EditRoom onSuccess={mockOnSuccess} roomData={roomData} />);

    const submitButton = screen.getByRole("button", { name: /Update Room/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("animate-spin");

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});