import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../path/to/Signup";
import "@testing-library/jest-dom";

describe("Signup Component", () => {
  // Test 1: Renders all form fields
  it("renders all form fields correctly", () => {
    render(<Signup />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Account/i })
    ).toBeInTheDocument();
  });

  // Test 2: Shows validation errors
  it("shows validation errors when fields are empty", async () => {
    render(<Signup />);
    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() => {
      expect(screen.getByText("First name is required")).toBeInTheDocument();
      expect(screen.getByText("Last name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  // Test 3: Validates email format
  it("validates email format", async () => {
    render(<Signup />);
    const emailInput = screen.getByLabelText(/Email/i);

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  // Test 4: Validates password match
  it("validates password match", async () => {
    render(<Signup />);
    const passwordInput = screen.getByLabelText(/Password/i);
    const confirmInput = screen.getByLabelText(/Confirm Password/i);

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmInput, { target: { value: "different123" } });
    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
    });
  });

  // Test 5: Shows success message on submission
  it("shows success message on successful submission", async () => {
    render(<Signup />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() => {
      expect(
        screen.getByText("New Admin account created successfully!")
      ).toBeInTheDocument();
    });
  });
});
