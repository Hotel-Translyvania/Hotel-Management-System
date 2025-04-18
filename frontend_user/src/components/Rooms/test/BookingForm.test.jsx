import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import BookingForm from "../BookingForm";
import { useBooking } from "../../../hooks/useBooking";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Mock the useBooking hook
jest.mock("../../../hooks/useBooking");
describe("BookingForm", () => {
  const mockRoom = {
    roomId: "123",
    roomNum: "101",
  };
  const mockOnClose = jest.fn();
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Mock the bookRoom function to resolve successfully by default
    useBooking.mockReturnValue({
      bookRoom: jest.fn().mockResolvedValue({}),
    });
  });
  it("renders the form with room number", () => {
    render(<BookingForm room={mockRoom} onClose={mockOnClose} />);

    expect(
      screen.getByText(`Book Room #${mockRoom.roomNum}`)
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Check-in Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Check-out Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Special Requests")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Confirm Booking" })
    ).toBeInTheDocument();
  });

  it("calls onClose when clicking the close button", () => {
    render(<BookingForm room={mockRoom} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("×"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking cancel button", () => {
    render(<BookingForm room={mockRoom} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("updates form data when inputs change", () => {
    render(<BookingForm room={mockRoom} onClose={mockOnClose} />);

    const checkInInput = screen.getByLabelText("Check-in Date");
    const checkOutInput = screen.getByLabelText("Check-out Date");
    const specialRequestsInput = screen.getByLabelText("Special Requests");

    fireEvent.change(checkInInput, {
      target: { value: "2023-06-01", name: "checkIn" },
    });
    fireEvent.change(checkOutInput, {
      target: { value: "2023-06-05", name: "checkOut" },
    });
    fireEvent.change(specialRequestsInput, {
      target: { value: "Need extra towels", name: "specialRequests" },
    });

    expect(checkInInput.value).toBe("2023-06-01");
    expect(checkOutInput.value).toBe("2023-06-05");
    expect(specialRequestsInput.value).toBe("Need extra towels");
  });

  it("submits the form with correct data", async () => {
    const mockBookRoom = jest.fn().mockResolvedValue({});
    useBooking.mockReturnValue({ bookRoom: mockBookRoom });

    render(<BookingForm room={mockRoom} onClose={mockOnClose} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText("Check-in Date"), {
      target: { value: "2023-06-01", name: "checkIn" },
    });
    fireEvent.change(screen.getByLabelText("Check-out Date"), {
      target: { value: "2023-06-05", name: "checkOut" },
    });
    fireEvent.change(screen.getByLabelText("Special Requests"), {
      target: { value: "Need extra towels", name: "specialRequests" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Confirm Booking"));

    // Check if bookRoom was called with correct data
    await waitFor(() => {
      expect(mockBookRoom).toHaveBeenCalledWith({
        roomId: mockRoom.roomId,
        checkIn: "2023-06-01",
        checkOut: "2023-06-05",
        specialRequests: "Need extra towels",
      });
    });

    // Check if onClose was called after successful submission
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("shows loading state during submission", async () => {
    // Create a promise that we can resolve later
    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    const mockBookRoom = jest.fn().mockReturnValue(promise);
    useBooking.mockReturnValue({ bookRoom: mockBookRoom });

    render(<BookingForm room={mockRoom} onClose={mockOnClose} />);

    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText("Check-in Date"), {
      target: { value: "2023-06-01", name: "checkIn" },
    });
    fireEvent.change(screen.getByLabelText("Check-out Date"), {
      target: { value: "2023-06-05", name: "checkOut" },
    });
    fireEvent.click(screen.getByText("Confirm Booking"));

    // Check if button shows loading state
    expect(screen.getByText("Booking...")).toBeInTheDocument();
    expect(screen.getByText("Booking...")).toBeDisabled();

    // Resolve the promise
    resolvePromise();
    await waitFor(() => {
      expect(screen.queryByText("Booking...")).not.toBeInTheDocument();
    });
  });

  it("handles submission error", async () => {
    const error = new Error("Booking failed");
    const mockBookRoom = jest.fn().mockRejectedValue(error);
    useBooking.mockReturnValue({ bookRoom: mockBookRoom });

    // Mock console.error to track if it's called
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<BookingForm room={mockRoom} onClose={mockOnClose} />);

    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText("Check-in Date"), {
      target: { value: "2023-06-01", name: "checkIn" },
    });
    fireEvent.change(screen.getByLabelText("Check-out Date"), {
      target: { value: "2023-06-05", name: "checkOut" },
    });
    fireEvent.click(screen.getByText("Confirm Booking"));

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith("Booking failed:", error);
    });

    // Verify onClose was NOT called
    expect(mockOnClose).not.toHaveBeenCalled();

    // Clean up mock
    consoleError.mockRestore();
  });

  it("requires check-in and check-out dates", async () => {
    render(<BookingForm room={mockRoom} onClose={mockOnClose} />);

    // Try to submit without filling required fields
    fireEvent.click(screen.getByText("Confirm Booking"));

    // Check that bookRoom wasn't called
    expect(useBooking().bookRoom).not.toHaveBeenCalled();

    // The HTML5 validation should prevent submission, but we can also check the required attributes
    expect(screen.getByLabelText("Check-in Date")).toBeRequired();
    expect(screen.getByLabelText("Check-out Date")).toBeRequired();
  });
});

describe("BookingForm Accessibility Tests", () => {
  it("should have no accessibility violations", async () => {
    const { container } = render(
      <BookingForm room={{ roomId: "1", roomNum: "101" }} onClose={jest.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
