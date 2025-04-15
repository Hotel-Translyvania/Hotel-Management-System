import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddManager from "./AddManager";
import { useForm } from "react-hook-form";

// Mocking the onSuccess function
const mockOnSuccess = jest.fn();

describe("AddManager Component", () => {
  it("renders the form correctly", () => {
    render(<AddManager onSuccess={mockOnSuccess} />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
  });

  it("displays validation errors when required fields are empty", async () => {
    render(<AddManager onSuccess={mockOnSuccess} />);
    
    // Submit the form without filling in any inputs
    fireEvent.submit(screen.getByRole("form"));
    
    // Wait for the validation errors to appear
    await waitFor(() => {
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  it("handles image upload correctly", () => {
    render(<AddManager onSuccess={mockOnSuccess} />);
    
    // Simulate file selection
    const fileInput = screen.getByLabelText(/pencil icon/i);
    const file = new File(["(⌐□_□)"], "profile.jpg", { type: "image/jpeg" });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Check if the image is displayed after selection
    expect(screen.getByAltText("Profile")).toHaveAttribute("src", expect.stringContaining("profile.jpg"));
  });

  it("calls onSuccess when form is submitted", async () => {
    render(<AddManager onSuccess={mockOnSuccess} />);
    
    // Fill the form with valid data
    fireEvent.input(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
    fireEvent.input(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "john.doe@example.com" } });
    fireEvent.input(screen.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });
    fireEvent.input(screen.getByLabelText(/Date of Birth/i), { target: { value: "1990-01-01" } });

    // Submit the form
    fireEvent.submit(screen.getByRole("form"));
    
    // Wait for the alert and success callback
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });
});
